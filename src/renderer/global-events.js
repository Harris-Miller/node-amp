import { ipcRenderer } from 'electron';
import store from './store';
import { setFiles } from './actions/browser';

ipcRenderer.on('new-files-from-path', (event, files) => store.dispatch(setFiles(files)));
