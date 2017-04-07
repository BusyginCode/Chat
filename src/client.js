/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import '../node_modules/react-select/dist/react-select.css';
import '../node_modules/react-progress-bar-plus/lib/progress-bar.css';
import getRoutes from './routes';
// import { deleteAuthToken } from 'redux/modules/auth';

import promiseFinally from 'promise.prototype.finally';

promiseFinally.shim();

const client = new ApiClient();
const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(_browserHistory, client, window.__data);
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
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}

// window.onbeforeunload = () => deleteAuthToken();

if (module.hot) { module.hot.accept(); }
