
var gulp = require('gulp');
var fs=require('fs');
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
         
    var tsResult=gulp.src('src/ts/virtual/UIHelper.ts')
        .pipe(ts({
            target: 'es5',//把typescript转换成es5标准的js文件,也可以是es6,但这个node版本不支持
            outFile:'virtual/UIHelper.0.1.js',
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
function uibuild(path){
    var UIHelper=require('./dest/virtual/UIHelper.0.1.js').UIHelper;
    UIHelper.makeClass(path);
    console.log('\n['+moment().format("HH:mm:ss")+']\n'+path.replace(/html$/,'ts'));
}
function uiwatch(event){
    gulp.watch('src/ui/**/*.html', function(event){
        uibuild(event.path);
    });
}
function buildProjects(event){
    var args=process.argv.slice(3);
    var UIHelper=require('./dest/virtual/UIHelper.0.1.js').UIHelper;
    for(const arg of args){
        let name=arg.replace(/^\-/,'');
        let path='src/ui/'+name;
        UIHelper.buildProject(name,path);
    }
}

gulp.task('tsc', tsc);
gulp.task('tscui',tscui);
gulp.task('ui:w',uiwatch);
gulp.task('project',buildProjects);

gulp.task('tsc:w', function () {
    gulp.watch('src/ts/*.ts', function(event){
        console.log('\n['+moment().format("HH:mm:ss")+']\n'+event.path.replace(/\\\\/g,'\\'));
    });
});
