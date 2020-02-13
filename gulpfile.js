const { series, parallel, src, dest } = require('gulp');
const babel = require('gulp-babel')
const del = require('del')

function clean() {
  return del(['lib/**', '!lib'], {force:true});
}

function buildjs() {
  return src('src/js/*.js')
    .pipe(dest('dist/'));
}

function buildcss() {
  return src('src/css/*.css')
    .pipe(dest('dist/'));
}

const build = parallel(buildjs, buildcss)

exports.default = series(clean, build);
exports.clean = clean;
