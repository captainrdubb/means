const express = require('express');
const path = require('path');
const { config } = require('../config');
const { authService, AUTH_ERRORS } = require('../auth');

const router = express.Router();

router.get('/', (req, res) =>
  res.sendFile(path.join(config.publicFolder, 'auth.html'))
);

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.registerUser(email, password);
    req.MEANS.user = { userId: user._id };
    res.redirect('../');
  } catch (error) {
    if (error.type === AUTH_ERRORS.REGISTRATION_ERROR) {
      res.statusCode = 422;
      res.statusMessage = error.message;
      res.end();
    }

    next(error);
  }
});

exports.authRouter = router;
