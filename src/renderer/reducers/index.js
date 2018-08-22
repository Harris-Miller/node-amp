import { combineReducers } from 'redux';
import player from './player';
import browser from './browser';

export default combineReducers({
  player,
  browser
});
