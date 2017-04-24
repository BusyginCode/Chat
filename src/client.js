/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
// import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import '../node_modules/react-select/dist/react-select.css';
import '../node_modules/react-progress-bar-plus/lib/progress-bar.css';
import getRoutes from './routes';
import MainConfig from './config';

import promiseFinally from 'promise.prototype.finally';

promiseFinally.shim();

const networkInterface = createNetworkInterface({
  uri: `http://${MainConfig.graphQlHost}:${MainConfig.graphQlPort}`
});

const apolloClient = new ApolloClient({
  networkInterface: networkInterface
});

const client = new ApiClient();
const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(_browserHistory, client, window.__data, apolloClient);
const history = syncHistoryWithStore(_browserHistory, store);

const component = (
  <Router
    render={  // eslint-disable-line
      (props) => <ReduxAsyncConnect {...props} helpers={{}} filter={item => !item.deferred} /> // eslint-disable-line
    }
    history={history}
  >
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <ApolloProvider store={store} key="provider" client={apolloClient}>
    {component}
  </ApolloProvider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  // const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
    <ApolloProvider store={store} key="provider" client={apolloClient}>
      <div>
        {component}
      </div>
    </ApolloProvider>,
    dest
  );
}

// window.onbeforeunload = () => deleteAuthToken();

if (module.hot) { module.hot.accept(); }
