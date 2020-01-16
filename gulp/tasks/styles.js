const gulp = require("gulp");
const cache_bust = require("gulp-cache-bust");
const paths = require("./paths");

//sass packages
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const cssVars = require("postcss-simple-vars"); // you can use $variable to write postCSS code
const cssImport = require("postcss-import"); // using @import
const hex2rgba = require("postcss-hexrgba"); // you can use rgba($color, opacity)
const cssNested = require("postcss-nested"); // nesting
const pxtorem = require("postcss-pxtorem");


// scss to css
function _sass_to_css() {
  var plugins = [
    cssImport,
    cssVars,
    cssNested,
    hex2rgba,
    //   cssnano,
    pxtorem({ replace: false }),
    autoprefixer
  ];
  return gulp
    .src(paths.scss + paths.main_scss)
    .pipe(sourcemaps.init()) //
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(postcss(plugins)) //[autoprefixer(), cssnano()])
    .pipe(cache_bust({ type: "timestamp" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css));
}

module.exports = _sass_to_css;
