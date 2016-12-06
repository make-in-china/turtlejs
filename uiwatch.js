
var gulp = require('gulp');
var fs=require('fs');
var moment=require('moment');
var ts = require('gulp-typescript');
var merge = require('merge2');  // Requires separate installation

function uibuildTs(path){
    var UIHelper=require('./dest/virtual/UIHelper.0.1.js').UIHelper;
    UIHelper.makeClass(path);
    console.log('\n['+moment().format("HH:mm:ss")+']\n'+path.replace(/html$/,'ts'));
}

function uibuildJs(path){
    var jsPath=path.replace(/ts$/,'js');
    var name=path.match(/[\s\S]*[\/\\](.*?)[\/\\].*?$/)[1];
    console.log('\n['+moment().format("HH:mm:ss")+']\n'+jsPath);
    var tsResult=gulp.src(path)
        .pipe(ts({
            target: 'es5',//把typescript转换成es5标准的js文件,也可以是es6,但这个node版本不支持
            outFile:'./dest/ui/'+name+'/index.js',
            experimentalDecorators:true,
            "declaration": true
            })
        );
     merge([
         tsResult.js.pipe(gulp.dest('dest')),
         tsResult.dts.pipe(gulp.dest('dest'))])
}
function uibuildJsCallBack(event){
    uibuildJs(event.path);
}
gulp.watch('src/ui/**/*.html', function(event){
    scriptWatch.end();
    uibuildTs(event.path);
    scriptWatch=gulp.watch('src/ui/**/script.ts',uibuildJsCallBack );
});
var  scriptWatch=gulp.watch('src/ui/**/script.ts',uibuildJsCallBack );