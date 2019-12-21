const gulp=require('gulp');
const cache_bust = require('gulp-cache-bust');
const paths= require('./paths');
 
function _fonts() {
  return gulp.src(paths.src_fonts)
  .pipe(cache_bust({type: 'timestamp'}))    
  .pipe(gulp.dest(paths.dist_fonts));
};

module.exports=_fonts;


