// src/reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducer'; // import your email reducer

const rootReducer = combineReducers({
  user: userReducer,
  // other reducers if you have any
});

export default rootReducer;
