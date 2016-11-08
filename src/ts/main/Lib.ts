
function _catch(e,fn?:Function){
    if(fn){
        fn(e);
    }else{
        $t.$error.emit(e);
    }
}
function throwError(err:string){
    try{
        throw new Error('turtle:\n'+err);
    }catch(e){
        _catch(e);
    }
}

declare var unescape:(v:string)=>string;
function getQueryString(name:string):string|null{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = location.search.substr(1).match(reg);
    if(r!=null){
        return unescape(r[2]); 
    }
    return null;
}
interface String{
    match(regexp: RegExp): RegExpMatchArray;
}
let getNameByURL=(function(){
    let RE1=/[a-zA-Z\d\._]+\.[a-zA-Z\d]+$/;
    let RE2=/\.[a-zA-Z\d]+$/;
    return function (url:string):string{
        return url.match(RE1)[0].replace(RE2,'');
    }
}());
let getFileNameByURL=(function(){
    let RE=/[a-zA-Z\d\._]+\.[a-zA-Z\d]+$/;
    return function (url:string):string{
        return url.match(RE)[0];
    }
}());
function appendQueryString(name,value){
    if(location.search){
        return location.href+'&'+name+'='+value;
    }else{
        return location.href+'?'+name+'='+value;
    }
}