// rootReducer.js

import { combineReducers } from 'redux';
import notificationReducer from './reducer';

const rootReducer = combineReducers({
  notificationReducer
});

export default rootReducer;
