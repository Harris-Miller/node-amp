const { ipcMain, dialog } = require('electron');
const parseDir = require('../util/parse-dir');

ipcMain.on('open-folder-dialog', event => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, ([dir]) => {
    if (dir) {
      const files = parseDir(dir);
      event.sender.send('selected-directory', files);
    }
  });
});

function openFolderDialog() {
  return new Promise(resolve => {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, ([dir]) => {
      if (dir) {
        resolve(parseDir(dir));
      } else {
        resolve([]);
      }
    });
  });
}

module.exports = {
  openFolderDialog
};
