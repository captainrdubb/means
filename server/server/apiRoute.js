const express = require('express');
const { authService } = require('../auth');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await authService.registerUser(email, password);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

exports.apiRouter = router;
