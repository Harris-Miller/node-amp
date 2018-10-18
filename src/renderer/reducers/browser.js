import immutable from 'immutable';
import { ADD_NEW_PATHS, SET_PATH_INFO, CLEAR } from '../actions/browser';

const defaultState = immutable.fromJS({
  files: {}
});

function arrayOfPathsToStarterObject(arr) {
  return arr.reduce((obj, key) => {
    obj[key] = { filepath: key, processed: false, tags: {} };
    return obj;
  }, {});
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case ADD_NEW_PATHS:
      return state.mergeIn(['files'], new immutable.Map(arrayOfPathsToStarterObject(action.data)));
    case SET_PATH_INFO:
      return state.setIn(['files', action.path], action.info);
    case CLEAR:
      return state.set('files', new immutable.Map());
    default:
      return state;
  }
};
