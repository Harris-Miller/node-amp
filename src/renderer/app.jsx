import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import { resolve } from 'path';
// import { homedir } from 'os';
import { ipcRenderer } from 'electron';
import 'normalize.css';
import store from './store';
import Wrapper from './components/wrapper';
// import Player from './components/player';
// import Main from './components/main';
import StateDisplay from './components/state-display';
// import { fetchFilesFromPath } from './actions/browser';
import { setFiles } from './actions/browser';
import './global-events';
import './styles/index.css';

export default class App extends Component {
  componentDidMount() {
    // TODO: move this to be settable
    // const homeDir = homedir();
    // fetchFilesFromPath(resolve(homeDir, 'Downloads'));

    ipcRenderer.on('newfiles', (event, tracks) => {
      store.dispatch(setFiles(tracks));
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Wrapper>
          <StateDisplay />
        </Wrapper>
      </Provider>
    );
  }
}
