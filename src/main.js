// require('update-electron-app')({
//   logger: require('electron-log')
// });

const path = require('path');
const glob = require('glob');
const { app, BrowserWindow } = require('electron');
const isDev = process.env.NODE_ENV === 'development';
const { buildAndSetApplicationMenu } = require('./main/menu');

const debug = /--debug/.test(process.argv[2]);

if (process.mas) {
  app.setName('Node Amp');
}

let mainWindow = null;

function makeSingleInstance() {
  if (process.mas) {
    return false;
  }

  return app.makeSingleInstance(() => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
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

    mainWindow = new BrowserWindow(windowOptions);
    if (isDev) {
      mainWindow.loadURL('http://localhost:3000/');
    } else {
      mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));
    }

    // Launch fullscreen with DevTools open
    if (debug) {
      mainWindow.webContents.openDevTools();
      mainWindow.maximize();
      require('devtron').install();
      installExtensions();
    }

    mainWindow.on('closed', () => {
      mainWindow = null;
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
    if (mainWindow === null) {
      createWindow();
    }
  });
}

initialize();
