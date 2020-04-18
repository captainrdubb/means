const { watch, series } = require('gulp');
const auth = require('./gulp-auth');
const config = require('./gulp-config');

const watchfiles = () => {
  watch(config.AUTH_HTML, auth.CopyAuth);
  watch(config.AUTH_SRC, auth.BuildAuthDev);
};

exports.prod = series(auth.CleanAuth, auth.ReplaceHtmlAuth, auth.BuildAuth);

exports.dev = series(
  auth.CleanAuth,
  auth.CopyAuth,
  auth.BuildAuthDev,
  watchfiles
);
