
var gulp = require('gulp');
var ts = require('gulp-typescript');
var moment=require('moment');
gulp.task('tsc:w', function () {
    gulp.watch('src/ts/*.ts', function(event){
        console.log('\n['+moment().format("HH:mm:ss")+']\n'+event.path.replace(/\\\\/g,'\\'));
        gulp.src('src/ts/index.ts')
            .pipe(ts({
                target: 'es5',//把typescript转换成es5标准的js文件,也可以是es6,但这个node版本不支持
                outFile:'js/index.js'
                })
            )
            .pipe(gulp.dest('dest'));
    });
});