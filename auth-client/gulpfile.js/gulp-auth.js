const gulp = require('gulp');
const uglify = require('gulp-uglify');
const htmlreplace = require('gulp-html-replace');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const del = require('del');
const path = require('./gulp-config');

const CleanAuth = () => {
  return del(`${path.DEST}/auth*`, { force: true });
};

const CopyAuth = () => {
  return gulp.src(path.AUTH_HTML).pipe(gulp.dest(path.DEST));
};

const BuildAuthDev = () => {
  return browserify({
    entries: [path.AUTH_ENTRY_POINT],
    extensions: ['.js', '.jsx'],
    debug: true,
    fullPaths: true,
  })
    .transform(babelify, {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    })
    .bundle()
    .on('error', console.error)
    .pipe(source(path.AUTH_OUT))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.DEST));
};

const BuildAuth = () => {
  return browserify({
    entries: [path.AUTH_ENTRY_POINT],
    extensions: ['.js', '.jsx'],
    debug: true,
  })
    .transform(babelify, {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    })
    .bundle()
    .on('error', console.error)
    .pipe(source(path.AUTH_MINIFIED_OUT))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(path.DEST));
};

const ReplaceHtmlAuth = () => {
  return gulp
    .src(path.AUTH_HTML)
    .pipe(
      htmlreplace({
        js: `/auth/${path.AUTH_MINIFIED_OUT}`,
      })
    )
    .pipe(gulp.dest(path.DEST));
};

module.exports = {
  CleanAuth,
  CopyAuth,
  BuildAuth,
  BuildAuthDev,
  ReplaceHtmlAuth,
};
