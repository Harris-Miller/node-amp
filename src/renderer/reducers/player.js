import immutable from 'immutable';
import { SET_PATH } from '../actions/player';

export default (state = new immutable.Map(), action = {}) => {
  switch (action.type) {
    case SET_PATH:
      return state.set('path', action.path);
    default:
      return state;
  }
};
