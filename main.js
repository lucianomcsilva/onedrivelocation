import electron from 'electron';
import path from 'path';
import url from 'url';
import 'babel-polyfill';

const app = electron.app;
const BrowserWindow = electron.BrowserWindow; 
const Menu = electron.Menu;
console.log(app);

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/assets/AppIcon.icns',
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  console.log(reactApp);
  setMainMenu();

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.on('ready', () => {
  setMainMenu()
  createWindow()
})

//app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu 
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


function setMainMenu() {
  const isMac = process.platform === 'darwin'

  const menuTemplate = [
    // { role: 'appMenu' }
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [        
        {
          label: 'Choose Folder',
          accelerator: 'Shift+CmdOrCtrl+F',
          click() {
            mainWindow.webContents.executeJavaScript('window.OneDriveLocation.handleClick()');
          }
        },      
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startspeaking' },
              { role: 'stopspeaking' }
            ]
          }
        ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://electronjs.org')
          }
        },
        { type: 'separator' },  
        {
          label: 'How it Works',
          accelerator: 'Shift+CmdOrCtrl+H',
          click() {
            mainWindow.webContents.executeJavaScript('window.HowItWorks.setState({show: true})');
          }
        },        
        {
          label: 'Disclaimers',
          accelerator: 'Shift+CmdOrCtrl+D',
          click() {
            mainWindow.webContents.executeJavaScript('window.Disclaimer.setState({show: true})');
          }
        }  
      ]
    } 
  ] 

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
  //Menu.append(menuTemplate)
}

