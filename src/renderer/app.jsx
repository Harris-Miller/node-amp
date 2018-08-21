import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Player from './scenes/player';
import Browser from './scenes/browser';

export default () => (
  <Provider store={store}>
    <div>
      <Player />
      <Browser />
    </div>
  </Provider>
);
