require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const bodyParser = require('body-parser');
const cors = require("cors");
const chokidar = require("chokidar")
const fs = require('fs');
const path = require('path');
// const router = require("./routes/router");

const listener = async () => {
    app.use(cors());
    app.use(bodyParser.json())
    app.use("/static", express.static("./static/"));
    // app.use("/", router);

    app.post("/get-location", async (req, res) => {
        console.log(req.body)
        console.log(req.file)
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
              const filePath = path.join("./", file);
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


    function assign(obj, keyPath, type, path) {
        lastKeyIndex = keyPath.length;

        // for (var i = 0; i < lastKeyIndex; ++ i) {
        //     key = "nextFolder";

        //     console.log("hello" in obj)

        //     // if first time

        //     // repeat


        //     if(obj.)

        //     // if (!(key in obj)){
        //     //     obj[key] = {
        //     //         fileName: type === "add"?keyPath[i]:"",
        //     //         folderName: type === "addDir"?keyPath[i]:"",
        //     //         fileCount: 0,
        //     //         folderCount: 0,
        //     //         path:"",
        //     //     }
        //     // }
        //     //   } else if((key in obj)) {

        //     //     obj[key].fileCount = 1 + obj[key].fileCount; 
        //     //     obj[key].folderCount = 1 + obj[key].folderCount 

        //     //   }
        //     //     obj = obj[key];
            
            
        //     //   console.log("---------", obj)
        // }
        // obj[keyPath[lastKeyIndex]];
    }

    httpServer.listen(process.env.PORT || process.env.SERVERPORT, () => {
        console.log("Server is Listening on port no.", process.env.PORT || process.env.SERVERPORT)
    })

}
listener();