
var gulp = require('gulp');
var fs=require('fs');
var moment=require('moment');
function uibuild(path){
    var UIHelper=require('./dest/virtual/UIHelper.0.1.js').UIHelper;
    UIHelper.makeClass(path);
    console.log('\n['+moment().format("HH:mm:ss")+']\n'+path.replace(/html$/,'ts'));
}
gulp.watch('src/ui/**/*.html', function(event){
    uibuild(event.path);
});