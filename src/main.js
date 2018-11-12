// require('update-electron-app')({
//   logger: require('electron-log')
// });

const path = require('path');
const glob = require('glob');
const { app, BrowserWindow } = require('electron');
const isDev = process.env.NODE_ENV === 'development';
const { buildAndSetApplicationMenu } = require('./main/menus/file');

const debug = /--debug/.test(process.argv[2]);

if (process.mas) {
  app.setName('Node Amp');
}

global.MAIN_WINDOW = null;

function makeSingleInstance() {
  if (process.mas) {
    return false;
  }

  return app.makeSingleInstance(() => {
    if (MAIN_WINDOW) {
      if (MAIN_WINDOW.isMinimized()) MAIN_WINDOW.restore();
      MAIN_WINDOW.focus();
    }
  });
}

function requireEverything() {
  const files = glob.sync(path.join(__dirname, './main/**/**.js'));
  files.forEach(file => require(file));
}

async function installExtensions() {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
}

function initialize() {
  const shouldQuit = makeSingleInstance();

  if (shouldQuit) {
    return app.quit();
  }

  requireEverything();

  function createWindow() {
    const windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 840,
      title: app.getName(),
      webPreferences: {
        webSecurity: false
      }
    };

    if (process.platform === 'linux') {
      // windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png');
    }

    MAIN_WINDOW = new BrowserWindow(windowOptions);
    if (isDev) {
      MAIN_WINDOW.loadURL('http://localhost:3000/');
    } else {
      MAIN_WINDOW.loadURL(path.join('file://', __dirname, '/index.html'));
    }

    // Launch fullscreen with DevTools open
    if (debug) {
      MAIN_WINDOW.webContents.openDevTools();
      MAIN_WINDOW.maximize();
      require('devtron').install();
      installExtensions();
    }

    MAIN_WINDOW.on('closed', () => {
      MAIN_WINDOW = null;
    });
  }

  app.on('ready', () => {
    buildAndSetApplicationMenu();
    createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (MAIN_WINDOW === null) {
      createWindow();
    }
  });
}

initialize();
