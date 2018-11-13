import immutable from 'immutable';
import { SET_PATH } from '../actions/player';

export default (state = new immutable.Map(), action = {}) => {
  switch (action.type) {
    case SET_PATH:
      return action.file;
    default:
      return state;
  }
};
