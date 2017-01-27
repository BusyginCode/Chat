import React from 'react';
import {IndexRoute, Route, browserHistory} from 'react-router';
import { loadToken } from 'redux/modules/auth';
import {
    App,
    SignInPage,
    ChatMain,
    NotFound,
    SignUpPage,
    Home,
  } from 'containers';

export default (store) => {

  const requireLogin = (nextState, replace, cb) => {
    const { auth } = store.getState();
    store.dispatch(loadToken())
      .then(() => cb())
      .catch(() => replace('/'))
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route history={browserHistory} path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      <Route path="signUp" component={SignUpPage} />
      <Route path="signIn" component={SignInPage} />
      <Route onEnter={requireLogin}>
        <Route path="main" component={ChatMain} />
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
