const { watch, series, parallel } = require('gulp');
const app = require('./gulp-app');
const auth = require('./gulp-auth');
const config = require('./gulp-config');

const watchfiles = () => {
  watch(config.HTML, app.Copy);
  watch(config.AUTH_HTML, auth.CopyAuth);
  watch(config.LOGO, parallel(app.BuildDev, auth.BuildAuthDev));
  watch(config.SRC, app.BuildDev);
  watch(config.AUTH_SRC, auth.BuildAuthDev);
};

exports.prod = series(
  parallel(app.Clean, auth.CleanAuth),
  parallel(app.ReplaceHtml, auth.ReplaceHtmlAuth),
  parallel(app.ReplaceVariablesProd),
  parallel(app.Build, auth.BuildAuth)
);

exports.dev = series(
  parallel(app.Clean, auth.CleanAuth),
  parallel(app.Copy, auth.CopyAuth),
  parallel(app.ReplaceVariablesDev),
  parallel(app.BuildDev, auth.BuildAuthDev),
  watchfiles
);
