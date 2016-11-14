import React from 'react';
import {IndexRoute, Route, browserHistory} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Login,
    LoginSuccess,
    NotFound,
    SignUpPage,
    Home,
  } from 'containers';

export default (store) => {

  const requireLogin = (nextState, replace, cb) => {
    const { auth } = store.getState();
      store.dispatch(loadAuth())
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
      <Route path="signIn" component={Login} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
