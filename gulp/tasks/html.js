const gulp=require('gulp');
const cache_bust = require('gulp-cache-bust');
const paths= require('./paths');
 
function _html() {

   return gulp.src(paths.src_html)  
  .pipe(cache_bust({type: 'timestamp'}))      
  .pipe(gulp.dest(paths.dist_html)); 
 
}
module.exports=_html;