const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});


exports.ApiRouter = router;