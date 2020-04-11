const path = require('path');
const config = require('./gulp-config');
const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 3000;
const public = path.join(__dirname, config.DEST);
const colors = require('colors');

app.use(express.static(public));

app.get('/', (req, res) => res.sendFile(path.join(public, 'index.html')));

let options = {};
if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'dev')
  options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
  };

https
  .createServer(options, app)
  .listen(port, () => console.log(colors.green(`listening on port ${port}`)));
