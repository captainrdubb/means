const gulp = require('gulp');
const uglify = require('gulp-uglify');
const htmlreplace = require('gulp-html-replace');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const streamify = require('gulp-streamify');
const del = require('del');
const path = require('./gulp-config');

const buildConfig = {
  entries: [path.ENTRY_POINT],
  extensions: ['.js', '.jsx'],
  debug: process.env.NODE_ENV === 'development',
  cache: {},
  packageCache: {},
  fullPaths: process.env.NODE_ENV === 'development'
};

gulp.task('clean', function () {
  return del(`${path.DEST}/**`);
});

gulp.task('copy', function (done) {
  gulp.src(path.HTML).pipe(gulp.dest(path.DEST));
  done();
});

gulp.task('watch', function () {
  console.log('Environment: ' + process.env.NODE_ENV);
  gulp.watch(path.HTML, { ignoreInitial: false }, gulp.series('copy'));

  var watcher = watchify(browserify(buildConfig))
    .transform(babelify, {
      presets: ['@babel/preset-env', '@babel/preset-react']
    })
    .bundle()
    .on('error', console.error)
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST));

  return watcher.on('update', function () {
    console.log('Detected file change, building...', { color: 'blue' });
    watcher
      .transform(babelify, {
        presets: ['@babel/preset-env', '@babel/preset-react']
      })
      .bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST));
    console.log('Finished building...', { color: 'green' });
  });
});

gulp.task('build', function () {
  browserify(buildConfig)
    .transform(babelify, {
      presets: ['@babel/preset-env', '@babel/preset-react']
    })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceHTML', function () {
  gulp
    .src(path.HTML)
    .pipe(
      htmlreplace({
        js: '~/' + path.MINIFIED_OUT
      })
    )
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', gulp.series('clean', 'replaceHTML', 'build'));

gulp.task('default', gulp.series('clean', 'watch'));
