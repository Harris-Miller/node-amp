import * as JsStore from 'jsstore';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
const Worker = require('worker-loader?publicPath=/&name=jsstore.worker.js!jsstore/dist/jsstore.worker.min');

export const connection = new JsStore.Instance(new Worker());
