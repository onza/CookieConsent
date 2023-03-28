var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass')(require('sass')),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    terser = require('gulp-terser'),
    eslint = require('gulp-eslint'),
    browsersync = require('browser-sync').create();

function clean() {
  return del([
    'lib/**',
    '!lib',
    'docs/lib'
  ]);
}

function buildjs() {
  return gulp.src('src/js/CookieConsent.js')
    .pipe(eslint())
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest('lib/js/'))
    .pipe(gulp.dest('docs/lib/js/'))
    .pipe(terser())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('lib/js/'))
}

function buildcss() {
  return gulp.src('src/scss/CookieConsent.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('lib/css/'))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
  .pipe(gulp.dest('lib/css/'))
  .pipe(gulp.dest('docs/lib/css/'))
}

function watch() {
  browsersync.init({
    server: {
      baseDir: './docs/'
    }
  });
  gulp.watch('docs/index.html', buildjs).on('change', browsersync.reload),
  gulp.watch('src/scss', buildcss).on('change', browsersync.reload),
  gulp.watch('src/js').on('change', browsersync.reload)
}

var build = gulp.series(clean, buildjs, buildcss, watch);

exports.default = build;