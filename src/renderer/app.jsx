import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { resolve } from 'path';
import store from './store';
import Player from './scenes/player';
import Browser from './scenes/browser';
import { fetchFilesFromPath } from './actions/browser';
import './global-events';

export default class App extends Component {
  componentDidMount() {
    // TODO: this should be the default path to use, should be customizable
    fetchFilesFromPath(resolve(process.env.HOME, 'Music'));
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Player />
          <Browser />
        </div>
      </Provider>
    );
  }
}
