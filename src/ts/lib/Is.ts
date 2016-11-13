
/// <reference path="../lib/TypeHelper.ts"/>
let
    persentRE               =   /^\s*([\d.]+)%\s*$/


function isNull<T>(p:T|null):p is null{
    return p==null;
}

function isUndefined<T>(p:T|undefined):p is undefined{
    return p=== void 0;
}

function isObject<T>(p:any): p is Object {
    let type = typeof p;
    return type === 'function' || type === 'object' && !!p;
}
function isRegExp(a):a is RegExp{
    return "[object RegExp]" === toStr.call(a)
}
function isDate(a):a is Date{
    return "[object Date]" === toStr.call(a)
}
function isNumber(a):a is number{
    return "[object Number]" === toStr.call(a)
}
function isString(a):a is string{
    return "[object String]" === toStr.call(a)
}
function isFunction(a):a is Function{
    return "[object Function]" === toStr.call(a)
}
// function isFinite(obj) {
//     return isFinite(obj) && !isNaN(parseFloat(obj));
// }
let isArray = Array.isArray || function(arg:any):arg is any[] {
    return "[object Array]"===toStr.call(arg)
}
function isPersent(s){
    return persentRE.test(s);
}

function isArrayLike(a){return typeof a.length=='number'}
