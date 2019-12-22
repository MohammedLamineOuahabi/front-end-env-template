const gulp=require('gulp');
const browserSync=require('browser-sync').create();
const del = require("del");

const _sass_to_css=require('./styles');
const _html=require('./html');
const _fonts=require('./fonts');
const _images=require('./images');
const _js=require('./js');
const  paths= require('./paths');

// Generic functions
function _cleanup() {
     return del(paths.dist);
};

// Static Server + watching scss/js/html files
function _watch() {

    browserSync.init({
        notify: false,
         
        server: paths.dist
    });
    gulp.watch(paths.src_fonts, _fonts);    
    gulp.watch('.'+paths.src_js+'**/*.js', _js)
    gulp.watch(paths.src_html,_html)
    gulp.watch(paths.src_images,_images)
    gulp.watch(paths.sub_scss, _sass_to_css)    
    gulp.watch(paths.dist_html).on('change', browserSync.reload);
    
}
exports.cleanup=_cleanup;
exports.fonts=_fonts;
exports.images=_images;
exports.html=_html;
exports.sass_to_css=_sass_to_css;
exports.js=_js;
exports.watch=_watch;
