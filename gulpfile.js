const gulp=require('gulp');
const browserSync=require('browser-sync').create();
const del = require("del");
const babel = require("gulp-babel");
const cache_bust = require('gulp-cache-bust');

//html
const htmlmin = require("gulp-htmlmin");

//sass packages
const sass=require('gulp-sass');
const sourcemaps =require('gulp-sourcemaps');
const postcss =require('gulp-postcss');
const autoprefixer =require('autoprefixer');
const cssnano =require('cssnano');
//js packages
const concat =require('gulp-concat');
const uglify =require('gulp-uglify');

//var
const 
dist          = './dist/',
main_scss     = 'main.scss',
main_js       = 'main.js',
src_html      = './src/*.html',
dist_html     = './dist/',
scss          = './src/sass/',
sub_scss      = './src/sass/sub_scss/**/*.scss',
src_js        = './src/js/**/*.js',
dist_js       = './dist/js/',
css           = './dist/css/';

//  concat scss files to main_scss 
function _concat_scss(){
    console.log(main_scss);  
    return gulp.src(sub_scss )
    .pipe(concat(main_scss))
	.pipe(gulp.dest(scss));
}
//  convert scss to css
function _sass_to_css() {
    return gulp.src(scss+main_scss)
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(cache_bust({type: 'timestamp'}))
      .pipe(gulp.dest(css));
  }
  
//  generate Html files  
function _html() {
    return gulp.src(src_html)
    .pipe(cache_bust({type: 'timestamp'}))    
    .pipe(gulp.dest(dist_html));
  };


//  generate js files **
function _js() {
    return gulp.src(src_js)
    .pipe(concat(main_js))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(cache_bust({type: 'timestamp'}))
    .pipe(gulp.dest(dist_js));
  };

// Generic functions
function _cleanup() { return del(dist);  }
// Static Server + watching scss/js/html files
function _serve() {

    browserSync.init({
        server: dist
    });

    gulp.watch(sub_scss, _concat_scss);    
    gulp.watch(scss+main_scss, _sass_to_css);    
    gulp.watch(src_js, _js);
    gulp.watch(src_html,_html)
    gulp.watch(dist_html).on('change', browserSync.reload);
    
};


exports.clean=_cleanup;
exports.default=gulp.series(_cleanup, _html,_concat_scss,_sass_to_css,_js,_serve);