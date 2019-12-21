// Generic functions

const gulp=require('gulp');
const del = require("del");
const  paths= require('./paths');
 
function _cleanup() { 
  return del(paths.dist);  
}
module.exports=_cleanup;
