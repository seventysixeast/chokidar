// my-electron-app/main.js
const { app, BrowserWindow } = require('electron');
const express = require('express');
const chokidar = require("chokidar");
const path = require('path');
const fs = require('fs');

let mainWindow;

const backendApp = express();
const backendPort = 3001;

backendApp.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});
backendApp.get('/api/directory', (req, res) => {
  const directoryPath = 'F:\New folder';

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const directoryInfo = [];

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        const subdirectoryFiles = fs.readdirSync(filePath);
        directoryInfo.push({
          name: file,
          type: 'directory',
          count: subdirectoryFiles.length,
        });
      } else {
        directoryInfo.push({
          name: file,
          type: 'file',
        });
      }
    });

    res.json(directoryInfo);
  });
});

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  console.log("__dirname",__dirname)
  mainWindow.loadFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}


  

app.whenReady().then(() => {
  backendApp.listen(backendPort, () => {
    console.log(`Backend server listening on http://localhost:${backendPort}`);
    chokidar.watch('./fruits').on('all', (event, path) => {
      console.log(event, path);
    });
  });

  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
