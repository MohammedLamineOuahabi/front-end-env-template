const paths=require('./gulp/tasks/paths');
const inputDir  = __dirname + paths.src_js+paths.main_js;
const outputDir = __dirname + paths.dist_js;

// console.log(inputDir);
// console.log(inputDir);

module.exports = {

// basic webpack configuration  
  entry:inputDir ,
  output: {
    path: outputDir,
    filename: paths.main_js
  },
  mode:'development',

// enable babel for ES6 Support don't forget to add .babelrc file
  
  module:{
    rules: [{
      test: /\.js$/,
      exclude:[ /node_modules/,/dist/],
      use: ['babel-loader']
  }]
}
//********************* */


}