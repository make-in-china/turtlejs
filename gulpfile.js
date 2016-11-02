
var gulp = require('gulp');
var ts = require('gulp-typescript');
var moment=require('moment');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');  // Requires separate installation
function tsc(event){
    var tsResult=gulp.src('src/ts/index.ts')
        .pipe(ts({
            target: 'es5',//把typescript转换成es5标准的js文件,也可以是es6,但这个node版本不支持
            outFile:'js/turtle.0.1.js',
            "declaration": true
            })
        );
        // tsResult.pipe(sourcemaps.init()).pipe(sourcemaps.write('../maps', {addComment: false}))
     merge([
         tsResult.js.pipe(gulp.dest('dest')),
         tsResult.dts.pipe(gulp.dest('dest'))])   
        
}
gulp.task('tsc', tsc);
gulp.task('tsc:w', function () {
    gulp.watch('src/ts/*.ts', function(event){
        console.log('\n['+moment().format("HH:mm:ss")+']\n'+event.path.replace(/\\\\/g,'\\'));
    });
});