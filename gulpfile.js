var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass')(require('sass')),
    rename = require('gulp-rename'),
    cleancss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    terser = require('gulp-terser');


function clean() {
  return del([
    'lib/**',
    '!lib',
    'docs/lib'
  ]);
}


function buildjs() {
  return gulp.src('src/js/CookieConsent.js')
    .pipe(gulp.dest('lib/js/'))
    .pipe(gulp.dest('docs/lib/js/'))
    .pipe(terser())
    .pipe(concat('CookieConsent.min.js'))
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
  gulp.watch('src/scss', buildcss)
  gulp.watch('src/js', buildjs)
}


var build = gulp.series(clean, buildjs, buildcss, watch);

exports.default = build;