import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';

/* eslint-disable no-underscore-dangle */
// found if we don't do this, it breaks when redux extension not installed
// import for when redux devtools is not installed
const composed = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ? compose(applyMiddleware(promiseMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  : applyMiddleware(promiseMiddleware);
/* eslint-enable no-underscore-dangle */

export default createStore(
  reducers,
  composed
);
