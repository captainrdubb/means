const path = require('path');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const htmlreplace = require('gulp-html-replace');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const del = require('del');
const config = require('./gulp-config');
const replace = require('gulp-replace');

const Clean = () => {
  return del([`${config.DEST}/index.html`, `${config.DEST}/bundle.*`], {
    force: true,
  });
};

const Copy = (done) => {
  gulp.src(config.HTML).pipe(gulp.dest(config.DEST));
  done();
};

const BuildDev = () => {
  return browserify({
    entries: [config.ENTRY_POINT],
    extensions: ['.js', '.jsx'],
    debug: true,
    fullPaths: true,
  })
    .transform(babelify, {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    })
    .bundle()
    .on('error', console.error)
    .pipe(source(config.OUT))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.DEST));
};

const Build = () => {
  //main
  return browserify({
    entries: [config.ENTRY_POINT],
    extensions: ['.js', '.jsx'],
    debug: true,
  })
    .transform(babelify, {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    })
    .bundle()
    .on('error', console.error)
    .pipe(source(config.MINIFIED_OUT))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.DEST));
};

const ReplaceHtml = () => {
  return gulp
    .src(config.HTML)
    .pipe(
      htmlreplace({
        js: `/${config.MINIFIED_OUT}`,
      })
    )
    .pipe(gulp.dest(config.DEST));
};

const ReplaceVariablesDev = () => {
  return gulp
    .src(config.APP_CONFIG)
    .pipe(replace('{gulp_replace_api_base_url}', config.DEV_API_URL))
    .pipe(gulp.dest(path.dirname(config.APP_CONFIG), { overwrite: true }));
};

const ReplaceVariablesProd = (args) => {
  return gulp
    .src(config.APP_CONFIG)
    .pipe(replace('{gulp_replace_api_base_url}', config.PROD_API_URL))
    .pipe(gulp.dest(path.dirname(config.APP_CONFIG), { overwrite: true }));
};

module.exports = {
  Clean,
  Copy,
  Build,
  BuildDev,
  ReplaceHtml,
  ReplaceVariablesDev,
  ReplaceVariablesProd,
};
