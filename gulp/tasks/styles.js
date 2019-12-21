const gulp=require('gulp');
const cache_bust = require('gulp-cache-bust');
const paths= require('./paths');

  //sass packages
const sass=require('gulp-sass');
//const sourcemaps =require('gulp-sourcemaps');
const postcss =require('gulp-postcss');
const autoprefixer =require('autoprefixer');
const cssnano =require('cssnano');

//  convert scss to css
   
function _sass_to_css() { 
  
    return gulp.src(paths.scss+paths.main_scss)
    .pipe(sass({outputStyle: 'expanded',includePaths: paths.sub_scss}).on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(cache_bust({type: 'timestamp'}))
    .pipe(gulp.dest(paths.css));

  }
  module.exports=_sass_to_css;