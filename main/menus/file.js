const { Menu } = require('electron');
const { openFolderDialog } = require('../actions/dialogs');

function buildAndSetApplicationMenu() {
  const template = [{

  }, {
    label: 'File',
    submenu: [
      {
        label: 'Add Folder',
        async click() {
          const tracks = await openFolderDialog();
          // console.log(tracks);
          MAIN_WINDOW.webContents.send('newtracks', tracks);
        }
      },
      {
        label: 'Clear',
        click() {
          MAIN_WINDOW.webContents.send('clear');
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
