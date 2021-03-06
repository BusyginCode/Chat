import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import ApiClient from './helpers/ApiClient';
import config from './config';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';

import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import createHistory from 'react-router/lib/createMemoryHistory';
// import {Provider} from 'react-redux';
import getRoutes from './routes';
const bodyParser = require('body-parser')

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer();

app.use(cookieParser());
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.png')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const networkInterface = createNetworkInterface({
    uri: `http://${config.graphQlHost}:${config.graphQlPort}`
  });

  const apolloClient = new ApolloClient({
    networkInterface: networkInterface
  });

  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client, {}, apolloClient);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (
          <ApolloProvider store={store} key="provider" client={apolloClient}>
            <ReduxAsyncConnect {...renderProps} />
          </ApolloProvider>
        );

        res.status(200);

        global.navigator = {userAgent: req.headers['user-agent']};

        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
