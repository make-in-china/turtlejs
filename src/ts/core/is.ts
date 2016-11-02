
/// <reference path="typeprototype.ts" />
let
    persentRE               =   /^\s*([\d.]+)%\s*$/


function isNull<T>(p:T|null):p is null{
    return p==null;
}
function isUndefined<T>(p:T|undefined):p is undefined{
    return p=== void 0;
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
    let type = typeof a;
    return type === 'function' || type === 'object' && !!a;
}
// function isFinite(obj) {
//     return isFinite(obj) && !isNaN(parseFloat(obj));
// }
let isArray = Array.isArray || function(a) {
    return "[object Array]"===toStr.call(a)
}
function isPersent(s){
    return persentRE.test(s);
}

function isArrayLike(a){return typeof a.length=='number'}
