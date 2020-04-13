const path = require('path');
const config = require('./gulpfile.js/gulp-config');
const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3000;
const public = path.join(__dirname, config.DEST);

app.use(express.static(public));

app.get('/auth', (req, res) => res.sendFile(path.join(public, 'auth.html')));

app.get('/', (req, res) => res.sendFile(path.join(public, 'index.html')));

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'dev') {
  https
    .createServer(
      {
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.crt'),
      },
      app
    )
    .listen(port, () => console.log(`listening on port ${port}`));
} else {
  app.listen(port, () => console.log(`listening on port ${port}`));
}
