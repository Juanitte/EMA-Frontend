const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'Easy Management Application',
    width: 800,
    height: 600,
    icon: path.join(__dirname, '/src/assets/Isotipo_icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  Menu.setApplicationMenu(null);

  if(env.toLowerCase() === 'development') {
    mainWindow.loadURL('http://localhost:4200')
  } else {
    mainWindow.loadFile(/* Angular dist folder path */'dist/browser/index.html')
  }

  mainWindow.maximize();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})