const { lstatSync } = require('fs');
const { dialog } = require('electron');
const parseDir = require('../util/parse-dir');
const { processFile } = require('./process-files');

function openFolderDialog() {
  return new Promise(resolve => {
    dialog.showOpenDialog({
      properties: ['openFiles', 'openDirectory', 'multiSelections']
    }, async paths => {
      if (paths) {
        const filepaths = paths.reduce((acc, path) => {
          if (lstatSync(path).isDirectory()) {
            return [...acc, ...parseDir(path)];
          }

          return [...acc, path];
        }, []);

        Promise.all(filepaths.map(processFile)).then(resolve);
      } else {
        resolve([]);
      }
    });
  });
}

module.exports = {
  openFolderDialog
};
