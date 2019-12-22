const  paths={
    dist          : 'dist',
    src           : 'src',

    src_fonts     : './src/fonts/**/*.*',
    dist_fonts    : './dist/fonts/',

    src_images    : './src/images/**/*.*',
    dist_images   : './dist/images/',
    src_html      : './src/*.html',
    dist_html     : './dist/',

    main_scss     : 'main.scss',
    scss          : './src/sass/',
    sub_scss      : './src/sass/**/*.scss',  
    css           : './dist/css/',

    main_js       : 'main.js',
    src_js        : '/src/js/', //remove . for webpack configuration
    dist_js       : '/dist/js/',
    src_v_js      : '/src/js/vendors/**/*.js'

    };

    module.exports=paths;