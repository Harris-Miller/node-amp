import immutable from 'immutable';
// import { } from '../actions/queue';

export default (state = new immutable.List(), action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};
