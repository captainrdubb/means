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

const Clean = () => {
  return del([`${path.DEST}/index.html`, `${path.DEST}/bundle.*`], {
    force: true,
  });
};

const Copy = (done) => {
  gulp.src(path.HTML).pipe(gulp.dest(path.DEST));
  done();
};

const BuildDev = () => {
  return browserify({
    entries: [path.ENTRY_POINT],
    extensions: ['.js', '.jsx'],
    debug: true,
    fullPaths: true,
  })
    .transform(babelify, {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    })
    .bundle()
    .on('error', console.error)
    .pipe(source(path.OUT))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.DEST));
};

const Build = () => {
  //main
  return browserify({
    entries: [path.ENTRY_POINT],
    extensions: ['.js', '.jsx'],
    debug: true,
  })
    .transform(babelify, {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    })
    .bundle()
    .on('error', console.error)
    .pipe(source(path.MINIFIED_OUT))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(path.DEST));
};

const ReplaceHtml = (done) => {
  return gulp
    .src(path.HTML)
    .pipe(
      htmlreplace({
        js: `/${path.MINIFIED_OUT}`,
      })
    )
    .pipe(gulp.dest(path.DEST));
};

module.exports = {
  Clean,
  Copy,
  Build,
  BuildDev,
  ReplaceHtml,
};
