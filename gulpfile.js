
var gulp = require('gulp');
gulp.task('default',function(){
    console.log(`任务列表：
    turtle    构建turtle.js`);
});
var tsconfig={
    // outFile:,
    // "noImplicitAny": true,
        // "strictNullChecks": true,
        "noImplicitThis":true,
        "alwaysStrict":true,
        "target":"es5",
        "experimentalDecorators":true,
        "skipLibCheck":true,
        declaration: true
        // "noUnusedParameters":true,
        // "noUnusedLocals":true
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
            tsResult.js.pipe(gulp.dest('dist')),
            tsResult.dts.pipe(gulp.dest('dist'))])
    }
}

gulp.task('turtle',function(){
    init();
    doTSC('src/index.ts','turtle.0.1.js')
});
gulp.task('project',function(){
    var args=process.argv.slice(3);
    var UIHelper=require('./dist/virtual/UIHelper.0.1.js').UIHelper;
    for(const arg of args){
        let name=arg.replace(/^\-/,'');
        let path='src/ui/'+name;
        UIHelper.buildProject(name,path);
    }
});