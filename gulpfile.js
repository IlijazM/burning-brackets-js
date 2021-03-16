const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

const transforms = [
  {
    transform: 'babelify',
    options: { presets: ['es2015'] },
  },
];

function defaultTask(cb) {
  gulp
    .src('build/*.js')
    //
    .pipe(concat('index.js'))
    //
    .pipe(minify())
    //
    .pipe(gulp.dest('.'));
  cb();
}

exports.default = defaultTask;
