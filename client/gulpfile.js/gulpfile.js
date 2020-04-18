const { watch, series } = require('gulp');
const app = require('./gulp-app');
const config = require('./gulp-config');

const watchfiles = () => {
  watch(config.HTML, app.Copy);
  watch(config.SRC, app.BuildDev);
};

exports.prod = series(app.Clean, app.ReplaceHtml, app.Build);

exports.dev = series(app.Clean, app.Copy, app.BuildDev, watchfiles);
