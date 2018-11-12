const mm = require('music-metadata');
const { ipcMain } = require('electron');
const parseDir = require('../util/parse-dir');

ipcMain.on('process-file', (event, filepath) => {
  mm.parseFile(filepath)
    .then(metadata => ({ filepath, tags: metadata.common, format: metadata.format }))
    .then(info => event.sender.send('process-completed', filepath, info));
});

ipcMain.on('get-files-from-path', (event, dir) => {
  const files = parseDir(dir);

  Promise.all(files.map(filepath =>
    mm.parseFile(filepath)
      .then(metadata => ({ filepath, tags: metadata.common, format: metadata.format }))
  )).then(filesWithTags => {
    event.sender.send('new-files-from-path', filesWithTags);
  });
});
