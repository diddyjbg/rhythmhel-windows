// Rhythmhel for Windows: the game in its own window. Change SITE if your server moves.
const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');
const SITE = 'https://rhythmhel.app/';
const GAME = SITE + 'play.html';

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');   // music can start without an extra click
if (!app.requestSingleInstanceLock()) app.quit();                                // only one window at a time

let win;
function create() {
  win = new BrowserWindow({
    width: 1280, height: 760, minWidth: 960, minHeight: 560, backgroundColor: '#0c0d1f', title: 'Rhythmhel',
    icon: path.join(__dirname, 'icon.png'), autoHideMenuBar: true, show: false,
    webPreferences: { contextIsolation: true, sandbox: true, backgroundThrottling: false }   // keep timing steady when the window is in the background
  });
  Menu.setApplicationMenu(null);
  win.once('ready-to-show', () => win.show());
  win.loadURL(GAME);
  // links to the website or anything else open in the normal browser
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith(GAME) && !url.startsWith('file:')) { e.preventDefault(); if (/^https?:/.test(url)) shell.openExternal(url); } });
  win.webContents.on('did-fail-load', (e, code, desc, url, isMain) => { if (isMain && code !== -3) win.loadFile(path.join(__dirname, 'offline.html')); });
  win.webContents.on('before-input-event', (e, i) => {
    if (i.type !== 'keyDown') return;
    if (i.key === 'F11') { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
    if (i.key === 'F5' || (i.control && i.key.toLowerCase() === 'r')) { win.loadURL(GAME); e.preventDefault(); }
  });
}
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
