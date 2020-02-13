const { series, parallel, src, dest } = require('gulp');
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const del = require('del')

function clean() {
  return del(['lib/**', '!lib'], {force:true});
}

function buildjs() {
  return src('src/js/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(dest('lib/js/'));
}

function buildcss() {
  return src('src/scss/CookieConsent.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
  .pipe(dest('lib/css/CookieConsent.css'))
}

const build = parallel(buildjs, buildcss)

exports.default = series(clean, build);
exports.clean = clean;