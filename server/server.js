const path = require('path');
const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3000;
const public = path.join(__dirname, 'public');

app.use(express.static(public));

app.get('/auth', (req, res) => res.sendFile(path.join(public, 'auth.html')));

app.get('/', (req, res) => res.sendFile(path.join(public, 'index.html')));

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'dev') {
  https
    .createServer(
      {
        key: fs.readFileSync(path.join(__dirname, 'server.key')),
        cert: fs.readFileSync(path.join(__dirname, 'server.crt')),
      },
      app
    )
    .listen(port, () => console.log(`listening on port ${port} with https`));
} else {
  app.listen(port, () => console.log(`listening on port ${port}`));
}
