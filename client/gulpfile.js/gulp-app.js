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
const replace = require('browserify-replace');

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
    transform: [
      [
        replace,
        {
          replace: {
            from: /{gulp_replace_api_base_url}/,
            to: config.DEV_API_URL,
          },
        },
      ],
      [babelify, { presets: ['@babel/preset-env', '@babel/preset-react'] }],
    ],
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
    transform: [
      [
        replace,
        {
          replace: {
            from: /{gulp_replace_api_base_url}/,
            to: config.PROD_API_URL,
          },
        },
      ],
      [babelify, { presets: ['@babel/preset-env', '@babel/preset-react'] }],
    ],
    debug: false,
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

module.exports = {
  Clean,
  Copy,
  Build,
  BuildDev,
  ReplaceHtml,
};
