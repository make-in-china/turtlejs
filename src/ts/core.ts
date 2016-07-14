
/// <reference path="global.ts" />
/// <reference path="$Event.ts"/>
class ArrayEx<T> extends Array<T>{
    last():T{
        if(this.length>0){
            return this[this.length-1];
        }
    }
}
let exec                    =	eval,
    toStr                   =	Object.prototype.toString,
    arrayPrototype          =   Array.prototype,
    Objectprototype         =   Object.prototype,
    slice                   =   arrayPrototype.slice,
    push                    =   arrayPrototype.push,
    splice                  =   arrayPrototype.splice,
    getPrototypeOf          =   Object.getPrototypeOf,
    replace                 =   String.prototype.replace,
    persentRE               =   /^\s*([\d.]+)%\s*$/,
    camelCaseRE             =   /-(\w)/g,
    camelizeRE              =   /-+(.)?/g,
    deCamelizeRE            =   /[A-Z]/g,
    classSplitRE            =   /\s+/g,
    rte                     =   new $Event;

/**
 * 压缩js后保留此函数用于console.log;
 */
let log=Function('s','console.log(s)');

/**
 * 压缩js后保留此函数用于debugger;
 */
let bp=Function('debugger');

function extend<T>(elem:T,elemEx):T{
    for(let e in elemEx){
        elem[e]=elemEx[e];
    }
    return elem;
}

function takeAttr(node:IElement,attrName:string,defaultValue?:any):string{
    if(!node.hasAttribute(attrName)){
        return defaultValue;
    }else{
        var s=node.getAttribute(attrName);
        node.removeAttribute(attrName);
        return s;
    }
}
function getAttr(node:IElement,attrName:string,defaultValue?:any):string{
    if(!node.hasAttribute(attrName)){
        return defaultValue;
    }else{
        return node.getAttribute(attrName);
    }
}
function isRegExp(a){
    return "[object RegExp]" === toStr.call(a)
}
function isDate(a){
    return "[object Date]" === toStr.call(a)
}
function isNumber(a){
    return "[object Number]" === toStr.call(a)
}
function isString(a){
    return "[object String]" === toStr.call(a)
}
function isFunction(a){
    return "[object Function]" === toStr.call(a)
}
function isObject(a) {
    var type = typeof a;
    return type === 'function' || type === 'object' && !!a;
}
function isFinite(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
}
function isUndefined(a) {
    return a === void 0;
}
let isArray = Array.isArray || function(a) {
    return "[object Array]"===toStr.call(a)
}
function isPersent(s){
    return persentRE.test(s);
}
function persentToFloat(s){
    let v=persentRE.exec(s);
    if(v){
        return parseInt(v[1])/100;
    }
}
function isArrayLike(a){return typeof a.length=='number'}

function _catch(e:Event,fn?:Fun){
    if(fn){
        fn(e);
    }else{
        rte.emit("error",e);
    }
}
function throwError(err:string){
    try{
        throw new Error('turtle:\n'+err);
    }catch(e){
        _catch(e);
    }
}

function camelize(str:string){ 
    return str.replace(camelizeRE, function(match, chr){ 
        return chr ? chr.toUpperCase() : '' 
    })
}
function decamelize(str:string){
    return str.replace(deCamelizeRE, function(match){ 
        return '-'+match.toLowerCase();
    }); 
}
function newObject(type:string,prototype?:Object):Object{
    var s='var '+type+'=function(){};';
    if(isObject(prototype)){
        s+=type+'.prototype=proto;';
    }
    s+='return new '+type+'();';
    return Function('proto',s)(prototype);
}
function NullValueHash(s){
    var arr=s.split(',');
    for(var i in arr){
        this[arr[i]]=null;
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
function removeItem(arr,obj){
    var index=arr.indexOf(obj);
    if(index!=-1){
        arr.splice(index, 1);
    }
}

function trim(s){return s.replace(/^\s*|\s*$/g,"");}
function HTMLTrim(s){return s.replace(/^[\s\r\n]*|[\s\r\n]*$/g,"");}
function trimLine(s){return s.replace(/^\s*/g,"").replace(/\s*$/g,"").replace(/\s*[\r\n]\s*/g,"");}
let dateFormat=(function(){
    return function(format,d){
        'use strict' 
        var o = {
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
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
})();
function camelCase(s){
    return s.replace(camelCaseRE,function(s,s1){
        return s1.toUpperCase();
    })
}

function splitByOnce(s:string,split:string):Array<string>{
    var 
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
const enum TreeEach{
    c_stopEach=1,
    c_repeat=2,
    c_noIn=4,
    c_noRepeat=8
}
interface ITreeEachStep{
    next:number
}
function treeEach(array:{length:number},property:string,fn:(node:Object,step?:ITreeEachStep)=>TreeEach|void,beginIndex:number=0){
    if(!isArrayLike(array)){
        return;
    }
    var 
        arr=array,
        i=beginIndex,
        stack=[],
        obj,
        obj2,
        state,
        step:ITreeEachStep={next:1};
        
    while(true){
        if(i<arr.length){
            obj=arr[i];
            step.next=1;
            state=fn(obj,step);
            if(state==undefined){
                state=0
            }else if(state==TreeEach.c_stopEach){
                break;
            }
            obj2=arr[i];
            if(obj2&&obj2!=obj&&!(TreeEach.c_noRepeat&state)){
                    state=state|TreeEach.c_repeat;
            }
            if(obj2&&obj2[property]&&obj2[property].length>0&&!(state&TreeEach.c_noIn)&&property){
                stack.push(arr);
                stack.push(i+(state&TreeEach.c_repeat?0:step.next));
                i=0;
                arr=obj2[property];
            }else{
                i+=(state&TreeEach.c_repeat?0:step.next);
            }
        }else if(stack.length>0){
            i=stack.pop();
            arr=stack.pop();
        }else{
            break;
        }
    }
    return {stack:stack,state:state,array:arr,index:i}
}

/**浏览器兼容 */

class ClassList{
    constructor(private __elem__:IElement){}
    add(value) {
        var classes = this.__elem__.className.split(classSplitRE);
        var index=classes.indexOf(value);
        if (!~index){
            classes.push(value);
            this.__elem__.className=classes.join(' ');  
        }
        
    }
    remove(value){
        var classes = this.__elem__.className.split(classSplitRE);
        var index=classes.indexOf(value);
        if (~index){
            classes.splice(index, 1);
            this.__elem__.className=classes.join(' ');  
        }
    }
    toggle(value) {
        var classes = this.__elem__.className.split(classSplitRE);
        var index=classes.indexOf(value);
        if (~index){
            classes.splice(index, 1);
        }else{
            classes.push(value);
        }
        this.__elem__.className=classes.join(' '); 
    }
    contains(value) {
        return !!~this.__elem__.className.split(classSplitRE).indexOf(value);
    }
    item(i) {
        return this.__elem__.className.split(classSplitRE)[i] || null;
    }
}
function defineClassList(object){
    Object.defineProperty(object,'classList',{
        enumerable: true,
        configurable: true,
        get:function(){
            if(this.__classList__){
                return this.__classList__;
            }else{
                Object.defineProperty(this,'__classList__',{
                    writable:false,
                    enumerable: false,
                    configurable: false,
                    value:new ClassList(this)
                });
                return this.__classList__;
            }
        }
    });
}