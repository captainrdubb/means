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

gulp.task('clean', function () {
  return del(`${path.DEST}/**`);
});

gulp.task('copy', function (done) {
  gulp.src(path.HTML).pipe(gulp.dest(path.DEST));
  done();
});

gulp.task('build-dev', function (done) {
  browserify({
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
  done();
});

gulp.task('watch', function () {
  gulp.watch(path.HTML, gulp.series('copy'));
  gulp.watch(path.SRC, gulp.series('build-dev'));
});

gulp.task('build', function (done) {
  browserify({
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
  done();
});

gulp.task('replace-html', function (done) {
  gulp
    .src(path.HTML)
    .pipe(
      htmlreplace({
        js: `/${path.MINIFIED_OUT}`,
      })
    )
    .pipe(gulp.dest(path.DEST));
  done();
});

gulp.task('prod', gulp.series('clean', 'replace-html', 'build'));

gulp.task('default', gulp.series('clean', 'copy', 'build-dev', 'watch'));
