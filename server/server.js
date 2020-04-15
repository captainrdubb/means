const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const cookieSession = require('cookie-session');
const { genSaltSync } = require('bcryptjs');
const { config } = require('./config');

const app = express();
const key = fs.readFileSync(path.join(__dirname, 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'server.crt'));
const sessionKeys = [genSaltSync(1), genSaltSync(1), genSaltSync(1)];
const public = path.join(__dirname, 'public');

app.use(
  cookieSession({
    name: 'means-session',
    keys: sessionKeys,
    maxAge: 24 * 60 * 60 * 1000,
    domain: config.domain,
    sameSite: 'strict',
  })
);

app.use(express.static(public));

//auth
app.get('/auth', (req, res) => res.sendFile(path.join(public, 'auth.html')));
app.post('/signup', (req, res) => {
  console.log(req.body);
  req.session.user = req.body;
  res.redirect('/');
});

//client
app.get('/', (req, res) => res.sendFile(path.join(public, 'index.html')));

const httpServer = http.createServer(app);
const httpsServer = https.createServer({ key, cert }, app);

httpServer.listen(config.port);
httpsServer.listen(config.securePort);

console.log(`listening on http port ${config.port}`);
console.log(`listening on https port ${config.securePort}`);
