import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ipcRenderer } from 'electron';
import 'normalize.css';
import store from './store';
import Wrapper from './components/wrapper';
import Player from './components/player';
import Main from './components/main';
// import StateDisplay from './components/state-display';
// import { fetchFilesFromPath } from './actions/browser';
import { addNewTracks, clear } from './actions/browser';
import './global-events';
import './styles/index.css';

export default class App extends Component {
  componentDidMount() {
    ipcRenderer.on('newtracks', (event, data) => {
      store.dispatch(addNewTracks(data));
    });

    ipcRenderer.on('clear', () => {
      store.dispatch(clear());
    });

    ipcRenderer.send('get-all-track-info-from-db');
  }

  render() {
    return (
      <Provider store={store}>
        <Wrapper>
          <Main />
          <Player />
        </Wrapper>
      </Provider>
    );
  }
}
