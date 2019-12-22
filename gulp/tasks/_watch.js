const gulp = require('gulp');
const _sass_to_css = require('./styles');
const _html = require('./html');
const _fonts = require('./fonts');
const _images = require('./images');
const _js = require('./js');
const paths = require('./paths');
const { browserSync } = require("./watch");
// Static Server + watching scss/js/html files
function _watch() {
    browserSync.init({
        server: paths.dist
    });
    _cleanup();
    _fonts();
    _images();
    _sass_to_css();
    _js();
    _html();
    gulp.watch(paths.src_fonts, _fonts);
    gulp.watch(paths.src_js + '**/*.js', _js).on('change', browserSync.reload);
    gulp.watch(paths.src_html, _html);
    gulp.watch(paths.src_images, _images);
    gulp.watch(paths.sub_scss, _sass_to_css).on('change', browserSync.reload);
    gulp.watch(paths.dist_html).on('change', browserSync.reload);
}
exports._watch = _watch;
