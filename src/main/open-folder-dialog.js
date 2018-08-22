const path = require('path');
const fs = require('fs');
const util = require('util');
const readfile = util.promisify(fs.readFile);
const { parse: parseID3 } = require('id3-parser');
const { ipcMain, dialog } = require('electron');
const debug = require('debug')('node-amp:open-folder-dialog');

function parseDir(dir) {
  const items = fs.readdirSync(dir);

  const musicFiles = items
    .filter(item => /.mp3$/.test(path.extname(item)))
    .map(item => path.join(dir, item));

  const folders = items.filter(item => fs.statSync(path.join(dir, item)).isDirectory());

  if (folders.length) {
    return musicFiles.concat(...folders.map(folder => parseDir(path.join(dir, folder))));
  }

  return musicFiles;
}

ipcMain.on('get-files-from-path', (event, dir) => {
  const files = parseDir(dir);

  Promise.all(files.map(filepath =>
    readfile(filepath)
      .then(parseID3)
      .then(tags => ({ filepath, tags }))
  )).then(filesWithTags => {
    debug('get-files-from-path', filesWithTags);
    event.sender.send('new-files-from-path', filesWithTags);
  });
});

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
