const { series, parallel, src, dest } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const eslint = require('gulp-eslint')
const del = require('del')
const webpack_stream = require('webpack-stream')
const webpack_config = require('./webpack.config.js')

function clean() {
  return del(['lib/**', '!lib'], {force:true});
}

function buildjs() {
  return src('src/js/CookieConsent.js')
    .pipe(eslint())
    .pipe(eslint.failAfterError())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(dest('lib/js/'))
    .pipe(dest('docs/lib/js/'))
}

function buildPolyfills() {
  return webpack_stream(webpack_config)
    .pipe(dest('lib/js/'))
    .pipe(dest('docs/lib/js/'))
}

function buildcss() {
  return src('src/scss/CookieConsent.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
  .pipe(dest('lib/css/'))
  .pipe(dest('docs/lib/css/'))
}

const build = parallel(buildjs, buildPolyfills, buildcss)

exports.default = series(clean, build);
exports.clean = clean;
