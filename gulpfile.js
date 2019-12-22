
const gulp=require('gulp');
const {cleanup,fonts,images,html,sass_to_css,js,watch} = require('./gulp/tasks/watch');

exports.cleanup=cleanup;
exports.recharge=gulp.series(cleanup,fonts,images,html,sass_to_css,js);
exports.default = watch;

