const express = require('express');
const path = require('path');
const { config } = require('../config');
const { authService } = require('../auth');

const router = express.Router();

router.get('/', (req, res) =>
  res.sendFile(path.join(config.publicFolder, 'auth.html'))
);

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.registerUser(email, password);
    req.MEANS.user = { userId: user.userId };
    res.redirect('../');
  } catch (error) {
    next(error);
  }
});

exports.authRouter = router;
