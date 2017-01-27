
var gulp = require('gulp');
gulp.task('default', function () {
    var fork=require('child_process').fork;
    var task=fork('gulp.uiWatch.ts');
    task.on("message",function(e){
        console.log(e);
    });
});
gulp.task('tsc',function(){
    var fs=require('fs');
    var moment=require('moment');
    var sourcemaps = require('gulp-sourcemaps');
    var ts = require('gulp-typescript');
    var merge = require('merge2');  // Requires separate installation
    var del = require('del');

    del(['dest/virtual/*']);
    var tsResult=gulp.src('src/ts/virtual/UIHelper/UIHelper.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            target: 'es5',//把typescript转换成es5标准的js文件,也可以是es6,但这个node版本不支持
            outFile:'virtual/UIHelper.0.1.js',
            experimentalDecorators:true,
            declaration: true
            })
        );
     merge([
         tsResult.js.pipe(gulp.dest('dest')),
         tsResult.dts.pipe(gulp.dest('dest'))])
         

});

gulp.task('tsc2',function(){
    var fs=require('fs');
    var moment=require('moment');
    var sourcemaps = require('gulp-sourcemaps');
    var ts = require('gulp-typescript');
    var merge = require('merge2');  // Requires separate installation
    var del = require('del');

    var tsResult=gulp.src('src/ts/index.ts')
        .pipe(ts({
            target: 'es5',//把typescript转换成es5标准的js文件,也可以是es6,但这个node版本不支持
            outFile:'js/turtle.0.1.js',
            experimentalDecorators:true,
            declaration: true
            })
        );
        // tsResult.pipe(sourcemaps.init()).pipe(sourcemaps.write('../maps', {addComment: false}))
     merge([
         tsResult.js.pipe(gulp.dest('dest')),
         tsResult.dts.pipe(gulp.dest('dest'))])   ;
         

});