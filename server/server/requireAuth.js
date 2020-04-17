const url = require('url');

const requireAuth = (req, res, next) => {
  const { user } = req.MEANS;
  if (!user) {
    return res.redirect(`../auth`);
  }
  return next();
};

exports.requireAuth = requireAuth;
