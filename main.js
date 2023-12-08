const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const express = require('express');
const chokidar = require("chokidar");
const path = require('path');
const fs = require('fs');

const http = require("http");
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const cors = require("cors");

let mainWindow;
let  selectedDirectory = process.cwd(); // Variable to store the selected directory


const backendApp = express();
const httpServer = http.createServer(backendApp);
const io = socketIO(httpServer);

const backendPort = 4040;

backendApp.use(cors());
backendApp.use(bodyParser.json())
backendApp.use("/static", express.static("./static/"));

backendApp.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

backendApp.get('/api/selectedDirectory', (req, res) => {
  res.json({ selectedDirectory });
});

// ============================================================

backendApp.post("/get-location", async (req, res) => {
  console.log(req.body)
  console.log(req.file)
  req.body.url='F:\\New folder';
  let obj = {}
  let i = 0
  let splitfilepath = []

  await fs.readdir(req.body.url , (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      const directoryInfo = [];

      files.forEach((file) => {
        const filePath = path.join(req.body.url, file);
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

      res.send({
        success: true,
        directoryInfo: directoryInfo,
        msg: "data found",
      });
  });

  return
})

backendApp.post("/read-file", async (req, res) => {
  await fs.readFile(req.body.url, (err, data)=>{
    if(err){
      res.send({
        success: false,
        msg: "data not found",
      });
    } else {
      res.send({
        success: true,
        fileInfo: data,
        content: data.toString(),
        msg: "data found",
      });
    }
  })

  return

})

// ============================================================

backendApp.get('/api/directory', (req, res) => {
  const directoryPath = 'F:\\New folder'; // Double backslashes in the path

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
  mainWindow.loadFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  openDirectoryDialog();
}

function openDirectoryDialog() {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: 'Select Directory',
    defaultPath: app.getPath('documents'), //default starting directory
    buttonLabel: 'Select', //button label
  }).then(result => {
    // check if the user selected a directory
    if (!result.canceled && result.filePaths.length > 0) {
      selectedDirectory = result.filePaths[0];
      console.log('selectedDirectory',selectedDirectory);
      io.emit('selectedDirectory', { selectedDirectory });
    }
  }).catch(err => {
    console.error(err);
  });
}

app.whenReady().then(() => {
  httpServer.listen(backendPort, () => {
    console.log(`Backend server listening on http://localhost:${backendPort}`);
    /*chokidar.watch('./fruits').on('all', (event, path) => {
      console.log(event, path);
    });*/
    chokidar.watch(selectedDirectory).on('all', (event, path) => {
      console.log(event, path);
      // Emit the directory change event to the frontend using Socket.io
      io.emit('directoryChange', { event, path });
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

// Socket.io event listeners (you can add more as needed)
io.on('connection', (socket) => {
  console.log('Client connected');

  // Send the selected directory to the newly connected client
  if (selectedDirectory) {
    socket.emit('selectedDirectory', { selectedDirectory });
  }

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});