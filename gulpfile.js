﻿
var gulp = require('gulp');
var ts = require('gulp-typescript');
var moment=require('moment');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');  // Requires separate installation
var fs=require('fs');
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
function ui(path,name){
    var tsResult=gulp.src(path+'/Class.ts')
        .pipe(ts({
            target: 'es5',//把typescript转换成es5标准的js文件,也可以是es6,但这个node版本不支持
            outFile:'ui/'+name+'.js',
            "declaration": true
            })
        );
        // tsResult.pipe(sourcemaps.init()).pipe(sourcemaps.write('../maps', {addComment: false}))
     merge([
         tsResult.js.pipe(gulp.dest('dest')),
         tsResult.dts.pipe(gulp.dest('dest'))])   
         
}
function tscui(event){
     fs.readdir(__dirname + "/src/ui", function(err,files){
        (function iterator(i){  
            if(i != files.length) {
                fs.stat(__dirname + "/src/ui/" + files[i], function(err,data){  
                    if(err) throw err;  
                    if(data.isDirectory()){
                        ui(__dirname + "/src/ui/"+files[i],files[i]);  
                    }  
                    iterator(i+1);  
                });  
            }  
        })(0);  
    });   
}
gulp.task('tsc', tsc);
gulp.task('tscui',tscui);
gulp.task('tsc:w', function () {
    gulp.watch('src/ts/*.ts', function(event){
        console.log('\n['+moment().format("HH:mm:ss")+']\n'+event.path.replace(/\\\\/g,'\\'));
    });
});
