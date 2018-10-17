const { Menu } = require('electron');
const { openFolderDialog } = require('./open-folder-dialog');

function buildAndSetApplicationMenu() {
  const template = [{

  }, {
    label: 'File',
    submenu: [
      {
        label: 'Add Folder',
        async click() {
          const files = await openFolderDialog();
          MAIN_WINDOW.webContents.send('newfiles', files);
        }
      }
    ]
  }, {
    label: 'Edit',
    submenu: [
      { role: 'foo' }
    ]
  }, {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          require('electron').shell.openExternal('https://electronjs.org');
        }
      }
    ]
  }];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

module.exports = {
  buildAndSetApplicationMenu
};
