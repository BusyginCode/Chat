import React from 'react';
import {IndexRoute, Route, browserHistory} from 'react-router';
import { loadToken } from 'redux/modules/auth';
import {
  App,
  SignInPage,
  ChatMain,
  NotFound,
  SignUpPage,
} from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    const { auth } = store.getState();
    if (auth.token) {
      cb();
    } else {
      store.dispatch(loadToken())
        .then(() => cb())
        .catch(() => {
          replace('/');
          cb();
        });
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route history={browserHistory} path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={SignInPage}/>
      <Route path="signUp" component={SignUpPage} />
      <Route onEnter={requireLogin}>
        <Route path="main" component={ChatMain} />
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
