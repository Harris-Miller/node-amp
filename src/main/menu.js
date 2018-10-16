const { Menu } = require('electron');

function buildAndSetApplicationMenu() {
  const template = [{
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
