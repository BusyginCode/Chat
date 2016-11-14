import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import classes from './classes'
import members from './members'
import conducts from './conducts'
import pins from './pins'
import interview from './interview'
import conductResults from './conductResults'
import loader from './loader'

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  classes,
  members,
  conducts,
  pins,
  interview,
  conductResults,
  loader
});
