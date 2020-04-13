const { watch, series, parallel } = require('gulp');
const app = require('./gulp-app');
const auth = require('./gulp-auth');
const path = require('./gulp-config');

const watchfiles = () => {
  watch(path.HTML, app.Copy);
  watch(path.AUTH_HTML, auth.CopyAuth);
  watch(path.LOGO, parallel(app.BuildDev, auth.BuildAuthDev));
  watch(path.SRC, app.BuildDev);
  watch(path.AUTH_SRC, auth.BuildAuthDev);
};

exports.prod = series(
  app.Clean,
  auth.CleanAuth,
  app.ReplaceHtml,
  auth.ReplaceHtmlAuth,
  app.Build,
  auth.BuildAuth
);

exports.default = series(
  app.Clean,
  auth.CleanAuth,
  app.Copy,
  auth.CopyAuth,
  parallel(app.BuildDev, auth.BuildAuthDev),
  watchfiles
);
