const gulp=require('gulp');
const browserSync=require('browser-sync').create();
const del = require("del");
const babel = require("gulp-babel");
const cache_bust = require('gulp-cache-bust');
const imagemin = require("gulp-imagemin");
//const rename = require('gulp-rename');


//sass packages
const sass=require('gulp-sass');
//const sourcemaps =require('gulp-sourcemaps');
const postcss =require('gulp-postcss');
const autoprefixer =require('autoprefixer');
const cssnano =require('cssnano');
//js packages
const browserify = require('browserify');
const babelify = require("babelify");
const concat =require('gulp-concat');
const uglify =require('gulp-uglify');


var source = require('vinyl-source-stream');
//var buffer = require('vinyl-buffer');
//var reactify = require('reactify');
//var util = require('gulp-util');

//var

const  paths={
dist          = './dist/',
main_scss     = 'main.scss',
src_fonts     = './src/fonts/**/*.*',
dist_fonts    = './dist/fonts/',
src_images    = './src/images/**/*.*',
dist_images   = './dist/images/',
src_html      = './src/*.html',
dist_html     = './dist/',
scss          = './src/sass/',
sub_scss      = './src/sass/**/*.scss',

main_js       = 'main.js',
src_js        = './src/js/',
src_v_js      = './src/js/vendors/**/*.js',
dist_js       = './dist/js/',
css           = './dist/css/'
};


//  copy images to dist  
function _images() {
  return gulp.src(src_images)
  .pipe(
    imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          {
            removeViewBox: false,
            collapseGroups: true
          }
        ]
      })
    ])
  )
  .pipe(gulp.dest(dist_images));
};

//  generate fonts files  
function _fonts() {
  return gulp.src(src_fonts)
  .pipe(cache_bust({type: 'timestamp'}))    
  .pipe(gulp.dest(dist_fonts));
};
//  generate Html files  
function _html() {
  return gulp.src(src_html)
  .pipe(cache_bust({type: 'timestamp'}))    
  .pipe(gulp.dest(dist_html));
};


//  convert scss to css
function _sass_to_css() {
    return gulp.src(scss+main_scss)
      .pipe(sass({outputStyle: 'expanded',includePaths: sub_scss}).on('error', sass.logError))
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(cache_bust({type: 'timestamp'}))
      .pipe(gulp.dest(css));
  };

//  generate js files **


 
function _js() {
    return browserify('./src/js/main.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
       .pipe(source('main.js'))
       //.pipe(uglify())
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/js/'))
        
};

// Generic functions
function _cleanup() { 
  return del(dist);  
}
// Static Server + watching scss/js/html files
function _serve() {

    browserSync.init({
        server: dist
    });

    gulp.watch(src_fonts, _fonts);    
    gulp.watch(src_js+'**/*.js', _js);
    gulp.watch(src_html,_html)
    gulp.watch(src_images,_images)
    gulp.watch(sub_scss, _sass_to_css);    
    gulp.watch(dist_html).on('change', browserSync.reload);
    
};


exports.clean=_cleanup;
exports.js=_js;
exports.default=gulp.series(_cleanup,_fonts,_images, _html,_sass_to_css,_js,_serve);