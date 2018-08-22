import { ipcRenderer } from 'electron';

export const SET_FILES = 'SET_FILES';

export function fetchFilesFromPath(path) {
  ipcRenderer.send('get-files-from-path', path);
}

export function setFiles(data) {
  return {
    type: SET_FILES,
    data
  };
}
