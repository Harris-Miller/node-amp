import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import immutable from 'immutable';
import persistState from 'redux-localstorage';
import reducers from './reducers';

const persistedState = persistState(null, {
  deserialize(str) {
    const obj = JSON.parse(str);
    Object.entries(obj).forEach(([key, value]) => {
      obj[key] = immutable.fromJS(value);
    });

    return obj;
  }
});

/* eslint-disable no-underscore-dangle */
// found if we don't do this, it breaks when redux extension not installed
// import for when redux devtools is not installed
const composed = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ? compose(applyMiddleware(promiseMiddleware), persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  : compose(applyMiddleware(promiseMiddleware), persistedState);
/* eslint-enable no-underscore-dangle */

export default createStore(
  reducers,
  composed
);
