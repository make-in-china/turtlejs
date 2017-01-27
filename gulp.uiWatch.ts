let gulp = require('gulp');
let moment = require('moment');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var merge = require('merge2');  // Requires separate installation
function uibuildJs(path) {

    var jsPath = path.replace(/ts$/, 'js');
    var name = path.match(/[\s\S]*[\/\\](.*?)[\/\\].*?$/)[1];
    console.log('\n[' + moment().format("HH:mm:ss") + ']\n' + jsPath);
    var tsResult = gulp.src(path)
        .pipe(sourcemaps.init())
        .pipe(ts({
            target: 'es5',//把typescript转换成es5标准的js文件,也可以是es6,但这个node版本不支持
            outFile: './ui/' + name + '/index.js',
            experimentalDecorators: true,
            "declaration": true
        })
        );
    merge([
        tsResult.js.pipe(gulp.dest('dest')),
        tsResult.dts.pipe(gulp.dest('dest'))])
}
gulp.watch(['src/ui/**/Script.ts'], function (event) {

    // uibuildTs(event.path);

    uibuildJs(event.path);
});
gulp.watch(['src/ui/**/View.test.ts'], function (event) {
    var path=event.path;
    var name = path.match(/[\s\S]*[\/\\](.*?)[\/\\].*?$/)[1];
    var tsResult = gulp.src(event.path)
        .pipe(sourcemaps.init())
        .pipe(ts({
            target: 'es5',
            experimentalDecorators: true,
            "declaration": true
        })
        );
    merge([
        tsResult.js.pipe(gulp.dest('dest/ui/'+name)),
        tsResult.dts.pipe(gulp.dest('dest/ui/'+name))])
});