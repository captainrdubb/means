const express = require('express');
const { authService } = require('../auth');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.registerUser(email, password);
    req.session.userId = user.userId;
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

exports.apiRouter = router;
