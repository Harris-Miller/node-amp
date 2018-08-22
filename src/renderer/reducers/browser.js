import immutable from 'immutable';
import { SET_FILES } from '../actions/browser';

const defaultState = immutable.fromJS({
  files: []
});

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_FILES:
      return state.set('files', new immutable.List(action.data.map(data => new immutable.Map(data))));
    default:
      return state;
  }
};
