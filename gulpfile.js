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

gulp.task('clean', function() {
  return del(`${path.DEST}/**`);
});

gulp.task('copy', function(done) {
  gulp.src(path.HTML).pipe(gulp.dest(path.DEST));
  done();
});

gulp.task('watch', function() {
  browserify({
    entries: [path.ENTRY_POINT],
    extensions: ['.js', '.jsx'],
    debug: process.env.NODE_ENV === 'development',
    cache: {},
    packageCache: {},
    fullPaths: true
  })
    .transform(babelify, {
      presets: ['@babel/preset-env', '@babel/preset-react']
    })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST));

  gulp.watch(path.HTML, gulp.series('copy'));

  var watcher = watchify(
    browserify({
      entries: [path.ENTRY_POINT],
      transform: [
        babelify,
        { presets: ['@babel/preset-env', '@babel/preset-react'] }
      ],
      debug: process.env.NODE_ENV === 'development',
      cache: {},
      packageCache: {},
      fullPaths: true
    })
  );

  return watcher
    .on('update', function() {
      watcher
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST));
      console.log('Updated');
    })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('build', function() {
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [
      babelify,
      { presets: ['@babel/preset-env', '@babel/preset-react'] }
    ]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceHTML', function() {
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

gulp.task('default', gulp.series('clean', 'copy', 'watch'));
