import immutable from 'immutable';
import { ADD_NEW_TRACKS, CLEAR } from '../actions/browser';

const defaultState = immutable.fromJS({
  files: {}
});

function arrayToKeyedObject(arr) {
  return arr.reduce((obj, trackObj) => {
    obj[trackObj.filepath] = trackObj;
    return obj;
  }, {});
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case ADD_NEW_TRACKS:
      return state.mergeIn(['files'], new immutable.Map(arrayToKeyedObject(action.data)));
    case CLEAR:
      return state.set('files', new immutable.Map());
    default:
      return state;
  }
};
