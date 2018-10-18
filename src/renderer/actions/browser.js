import { ipcRenderer } from 'electron';

export const ADD_NEW_PATHS = 'ADD_NEW_PATHS';
export const SET_PATH_INFO = 'SET_PATH_INFO';
export const CLEAR = 'CLEAR';

export function clear() {
  return {
    type: CLEAR
  };
}

export function fetchFilesFromPath(path) {
  ipcRenderer.send('get-files-from-path', path);
}

export function addNewPaths(data) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_PATHS,
      data
    });

    const unprocessed = getState().browser.get('files').filter(file => !file.processed);

    console.log(unprocessed.toJS());

    const unprocessedIterator = unprocessed.entries();

    ipcRenderer.on('process-completed', (event, path, info) => {
      dispatch({
        type: SET_PATH_INFO,
        path,
        info: { ...info, processed: true }
      });

      const next = unprocessedIterator.next();

      if (!next.done) {
        const [nextPath] = next.value;
        ipcRenderer.send('process-file', nextPath);
      }
    });

    let count = 0;
    let current = { done: false };

    while (count < 8 && !current.done) {
      current = unprocessedIterator.next();
      const [path] = current.value;
      count++;
      ipcRenderer.send('process-file', path);
    }
  };
}
