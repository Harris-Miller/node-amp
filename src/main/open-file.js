const fs = require('fs');
const { ipcMain } = require('electron');

ipcMain.on('open-file', (event, pathToFile) => {
  const buffer = fs.readFileSync(pathToFile);
  event.sender.send('file-open', buffer);
});
