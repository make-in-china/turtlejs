



let
    arrayConstructor:Array<any>                 =   <any>Array.prototype,
    objectConstructor:ObjectConstructor         =   <any>Object.prototype,
    stringConstructor:String                    =   <any>String.prototype,
    toStr                                       =	objectConstructor.toString,
    slice                                       =   arrayConstructor.slice,
    push                                        =   arrayConstructor.push,
    splice                                      =   arrayConstructor.splice,
    getPrototypeOf                              =   objectConstructor.getPrototypeOf,
    replace                                     =   stringConstructor.replace;


interface Constructor{
    prototype:Object
}
    
function extend<T>(elem:T,elemEx):T{
    for(let e in elemEx){
        elem[e]=elemEx[e];
    }
    return elem;
}
function merge<T>(elem:T,elemEx):T{
    for(let e in elemEx){
        if(!elem.hasOwnProperty(e)){
            elem[e]=elemEx[e];
        }
    }
    return elem;
}
function removeItem<T>(arr:T[],obj:T){
    let index=arr.indexOf(obj);
    if(index!=-1){
        arr.splice(index, 1);
    }
}

function persentToFloat(s:string):number|undefined{
    let v=persentRE.exec(s);
    if(v){
        return parseInt(v[1])/100;
    }
}

function parseBool(v):boolean {
    if ( typeof v == 'string') {
        v = v.replace(/[\s]/g, '').toLowerCase();
        if(v&&(v=='false'||v =='0'||v=='null'||v =='undefined')){
            v = false;
        }else if (v){
            v = true;
        }
    }
    return !!v;
}

function trim(s){return s.replace(/^\s*|\s*$/g,"");}
function HTMLTrim(s){return s.replace(/^[\s\r\n]*|[\s\r\n]*$/g,"");}
function trimLine(s){return s.replace(/^\s*/g,"").replace(/\s*$/g,"").replace(/\s*[\r\n]\s*/g,"");}
let dateFormat=(function(){
    return function(format,d){
        'use strict' 
        let o = {
            "M+" : d.getMonth() + 1, //month
            "d+" : d.getDate(), //day
            "h+" : d.getHours(), //hour
            "m+" : d.getMinutes(), //minute
            "s+" : d.getSeconds(), //second
            "q+" : Math.floor((d.getMonth() + 3) / 3), //quarter
            "S" : d.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
})();
let 
    camelCaseRE             =   /-(\w)/g,
    camelizeRE              =   /-+(.)?/g,
    deCamelizeRE            =   /[A-Z]/g
function camelCase(s){
    return s.replace(camelCaseRE,function(s,s1){
        return s1.toUpperCase();
    })
}
function camelize(str:string){ 
    return str.replace(
        camelizeRE, 
        function(match, chr){ 
            return chr ? chr.toUpperCase() : '' 
        }   
    )
}
function decamelize(str:string){
    return str.replace(deCamelizeRE, function(match){ 
        return '-'+match.toLowerCase();
    }); 
}

function splitByOnce(s:string,split:string):Array<string>{
    let 
        index=s.indexOf(split),
        arr=[];
    if(index!=-1){
        arr.push(s.substring(0,index));
        arr.push(s.substring(index+split.length,s.length));
    }else{
        arr.push(s);
    }
    return arr;
}

// function newKeyArrayObject<T>(type:string):KeyArrayObject<T>{
//     return create(type,KeyArrayObject);
// }
// function newHashObject(type:string):HashObject<any>{
//     return create(type,HashObject);
// }
// function create(type:string,tsClass?:Constructor):any{
//     let s='let '+type+'=function(){};';
//     if(isObject((tsClass).prototype)){
//         s+=type+'.prototype=proto;';
//     }
//     s+='return new '+type+'();';
//     return Function('proto',s)((<any>tsClass).prototype);
// }
// let newArrayObject=(function(){
//     return function(type:string):ArrayEx<any>{
//         return create(type,ArrayEx);
//     }
// }());

function getBind(obj:Object, fn:Function) {
    return function () {
        return fn.apply(obj, arguments);
    };
}