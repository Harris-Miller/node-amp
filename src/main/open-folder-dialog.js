const path = require('path');
const fs = require('fs');
const { ipcMain, dialog } = require('electron');

function parseDir(dir) {
  const items = fs.readdirSync(dir);

  const musicFiles = items.filter(item => /.mp3$/.test(path.extname(item))).map(item => path.join(dir, item));
  const folders = items.filter(item => fs.statSync(path.join(dir, item)).isDirectory());

  if (folders.length) {
    return musicFiles.concat(...folders.map(folder => parseDir(path.join(dir, folder))));
  }

  return musicFiles;
}

ipcMain.on('open-folder-dialog', event => {
  console.log('open-folder-dialog');
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, ([dir]) => {
    if (dir) {
      const files = parseDir(dir);
      event.sender.send('selected-directory', files);
    }
  });
});
