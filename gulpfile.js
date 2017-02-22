﻿
var gulp = require('gulp');
gulp.task('ui:w', function () {
    var fork=require('child_process').fork;
    var task=fork('gulp.uiWatch.ts');
    task.on("message",function(e){
        console.log(e);
    });
});
var tsconfig={
    target: 'es5',//把typescript转换成es5标准的js文件,也可以是es6,但这个node版本不支持
    // outFile:,
    experimentalDecorators:true,
    declaration: true,
    "noImplicitThis":true,
    "skipLibCheck":true,
    "noUnusedParameters":true,
    "noUnusedLocals":true
    // "noImplicitAny": true,
    // "alwaysStrict":true
    }
//virtual

var fs
var moment
var sourcemaps 
var ts 
var merge 
var del
var doTSC
function init(){
    fs=require('fs');
    moment=require('moment');
    sourcemaps = require('gulp-sourcemaps');
    ts = require('gulp-typescript');
    merge = require('merge2');  // Requires separate installation
    del = require('del');
    doTSC=function(path,outFile){
        tsconfig.outFile=outFile;
        var tsResult=gulp.src(path)
            // .pipe(sourcemaps.init())
            .pipe(ts(tsconfig)
            );
            // tsResult.pipe(sourcemaps.init()).pipe(sourcemaps.write('../maps', {addComment: false}))
        merge([
            tsResult.js.pipe(gulp.dest('dest')),
            tsResult.dts.pipe(gulp.dest('dest'))])
    }
}

gulp.task('vm',function(){
    init();

    del(['dest/virtual/*']);
    doTSC('src/ts/virtual/UIHelper/UIHelper.ts','virtual/turtle.0.1.js')
});
gulp.task('turtle',function(){
    init();
    doTSC('src/ts/index.ts','virtual/UIHelper.0.1.js')
});
gulp.task('vdom',function(){
    init();
    doTSC('src/ts/virtual/UIHelper/ExportVDOM.ts','virtual/vdom.0.1.js')
});
gulp.task('default',function(){
    console.log(`任务列表：
    project   创建工程
        name  工程名
    ui:w      监视ui工程
    turtle    构建turtle.js
    vm        构建 uihealper.js
    vdom      构建 vdom.js`);
});
gulp.task('project',function(){
    var args=process.argv.slice(3);
    var UIHelper=require('./dest/virtual/UIHelper.0.1.js').UIHelper;
    for(const arg of args){
        let name=arg.replace(/^\-/,'');
        let path='src/ui/'+name;
        UIHelper.buildProject(name,path);
    }
});