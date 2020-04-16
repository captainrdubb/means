const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const { genSaltSync } = require('bcryptjs');
const { config } = require('../config');
const { authRouter } = require('./authRoute');
const { apiRouter } = require('./apiRoute');
const { clientRouter } = require('./clientRoute');

const app = express();
const key = fs.readFileSync(path.join(__dirname, 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'server.crt'));
const sessionKeys = [genSaltSync(1), genSaltSync(1), genSaltSync(1)];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'means-session',
    keys: sessionKeys,
    maxAge: 24 * 60 * 60 * 1000,
    domain: config.domain,
    sameSite: 'strict',
  })
);

app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use('/', clientRouter);
app.use(express.static(config.publicFolder));

const httpServer = http.createServer(app);
const httpsServer = https.createServer({ key, cert }, app);

httpServer.listen(config.port);
httpsServer.listen(config.securePort);

console.log(`listening on http port ${config.port}`);
console.log(`listening on https port ${config.securePort}`);
