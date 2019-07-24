let { gulp, src, dest, watch } = require('gulp');
let uglify       = require('gulp-uglify');
let concat       = require('gulp-concat');
let cleanCSS     = require('gulp-clean-css');
let gutil        = require('gulp-util');
let plumber      = require('gulp-plumber');
let sass         = require('gulp-sass');


let scripts = {
    
    main:{
        input: [
            'scripts/app.js',
            'scripts/app.*.js'
        ],
        dest:[
            'js/'
        ]
    },
    vendor:{
        input:[
            'scripts/vendor/jquery-3.1.1.min.js',
            'scripts/vendor/jquery-ui.min.js',
            'scripts/vendor/helpers.js',
            'scripts/vendor/spectrum.js',
            
            'scripts/plugins/*.js'
        ],
        dest:[
            'js/'
        ]
    }
};

let styles = {
    
    main:{
        input: [
            'sass/styles/main.scss'
        ],
        path:[
            'sass/**/*.scss'
        ],
        dest:[
            'styles/'
        ]
    },
    
    iframe:{
        input: [
            'sass/styles_iframe/main.scss'
        ],
        path:[
            'sass/**/*.scss'
        ],
        dest:[
            'styles/'
        ]
    }
    
};

// Compiling Javascripts
function compileJavascript(done) {
    
    Object.keys(scripts).forEach(function(key) {
        
        return src(scripts[key].input, { sourcemaps: true })
        
        .pipe(plumber())
        
        .pipe(concat(key + '.js'))
        
        .on('error', gutil.log)
        
        .pipe(uglify())
        
        .pipe(dest(scripts[key].dest,  { sourcemaps: '.' , filename: key + '.css'}))
        
        .on('end', done);
    })
}

//Compiling Styles
function compileStyles(done) {
    
    Object.keys(styles).forEach(function(key) {
        
        return src(styles[key].input, { sourcemaps: true })
        
        .on('error', gutil.log)
        
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        
        .pipe(sass({
            errLogToConsole: true,
            includePaths:[styles[key].path]
        }))
        
        .pipe(cleanCSS())
        
        .pipe(concat(key + '.css'))
        
        .pipe(dest(styles[key].dest,  { sourcemaps: '.' , filename: key + '.css'}))
        
        .on('end', function () {
            
            done();
            
        });
        
    });
    
}


function watchTask() {
    
    watch(styles.main['path'], compileStyles);
    watch(scripts.main['input'], compileJavascript);
    watch(scripts.vendor['input'], compileJavascript);
    
}

exports.watch = watchTask;

