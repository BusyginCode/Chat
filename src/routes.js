import React from 'react';
import {IndexRoute, Route, browserHistory} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Login,
    ChatMain,
    NotFound,
    SignUpPage,
    Home,
  } from 'containers';

export default (store) => {

  const requireLogin = (nextState, replace, cb) => {
    const { auth } = store.getState();
    console.log('TOKEN ', auth.token)
    if (auth.token) {
      cb()
    } else {
      replace('/')
      cb()
    }
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
      <Route onEnter={requireLogin}>
        <Route path="main" component={ChatMain} />
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
