import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { resolve } from 'path';
import { homedir } from 'os';
import 'normalize.css';
import store from './store';
import Player from './components/player';
import Browser from './components/browser';
import { fetchFilesFromPath } from './actions/browser';
import './global-events';
import './styles/index.css';

export default class App extends Component {
  componentDidMount() {
    // TODO: move this to be settable
    const homeDir = homedir();
    fetchFilesFromPath(resolve(homeDir, 'Music'));
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
