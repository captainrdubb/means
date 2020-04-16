const express = require('express');
const path = require('path');
const { config } = require('../config');

const router = express.Router();

router.get('/', (req, res) =>
  res.sendFile(path.join(config.publicFolder, 'auth.html'))
);

exports.authRouter = router;
