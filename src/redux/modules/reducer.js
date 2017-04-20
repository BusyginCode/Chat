import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import friends from './friends';
import chat from './chat';
import loader from './loader';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  loader,
  chat,
  friends,
});
