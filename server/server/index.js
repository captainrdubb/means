const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('client-sessions');
const { genSaltSync } = require('bcryptjs');
const { config } = require('../config');
const { authRouter } = require('./authRoute');
const { apiRouter } = require('./apiRoute');
const { clientRouter } = require('./clientRoute');
const { requireAuth } = require('./requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  sessions({
    cookieName: 'MEANS',
    secret: genSaltSync(3),
    duration: 60 * 60 * 1000,
    activeDuration: 30 * 60 * 1000,
    cookie: {
      signed: process.env.NODE_ENV !== 'dev',
      ephemeral: true,
      sameSite: 'strict',
    },
  })
);

const whatThe = (location) => (req, res, next) => {
  console.log(location, req.originalUrl, req.params);
  next();
};

app.use('/api', requireAuth, apiRouter);

app.use('/auth', whatThe('auth: '), authRouter, express.static(config.publicFolder));

app.use('/', requireAuth, clientRouter, express.static(config.publicFolder));

if (process.env.NODE_ENV === 'dev') {
  const key = fs.readFileSync(path.join(__dirname, 'server.key'));
  const cert = fs.readFileSync(path.join(__dirname, 'server.crt'));
  const httpsServer = https.createServer({ key, cert }, app);
  httpsServer.listen(config.securePort);
  console.log(`listening on https port ${config.securePort}`);
} else {
  const httpServer = http.createServer(app);
  httpServer.listen(config.port);
  console.log(`listening on http port ${config.port}`);
}
