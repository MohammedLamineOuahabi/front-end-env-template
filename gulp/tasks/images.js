const gulp=require('gulp');
const imagemin = require("gulp-imagemin");
const  paths= require('./paths');


//  optimize & copy images to dist  
function _images(){
return  gulp.src(paths.src_images)
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
  .pipe(gulp.dest(paths.dist_images));
  
}
module.exports=_images;