
var gulp = require('gulp');
var fs=require('fs');
var moment=require('moment');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var merge = require('merge2');  // Requires separate installation
var del = require('del');

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
function uibuildTs(path){
    var moment=require('moment');
    console.log('\n['+moment().format("HH:mm:ss")+']\n'+path.replace(/html$/,'ts'));
    var UIHelper=require('./dest/virtual/UIHelper.0.1.js').UIHelper;

    UIHelper.makeClass(path);
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

// gulp.task('tsc2', tsc2);
// gulp.task('tscui',tscui);    

// gulp.task('project',buildProjects);

// gulp.task('tsc:w', function () {
//     gulp.watch('src/ts/*.ts', function(event){
//         console.log('\n['+moment().format("HH:mm:ss")+']\n'+event.path.replace(/\\\\/g,'\\'));
//     });
// });
tsc();