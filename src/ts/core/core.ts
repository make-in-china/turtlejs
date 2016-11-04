
/// <reference path="../lib/lib.d.ts" />
/// <reference path="typehelper.ts" />
/// <reference path="is.ts" />
/// <reference path="hashobject.ts"/>
/// <reference path="../$Event.ts"/>
/// <reference path="node.ts"/>
/// <reference path="bind.ts"/>
/// <reference path="browserhelp.ts"/>
/// <reference path="debughelper.ts"/>
/// <reference path="treeeach.ts"/>

let exec                    =	eval,
    camelCaseRE             =   /-(\w)/g,
    camelizeRE              =   /-+(.)?/g,
    deCamelizeRE            =   /[A-Z]/g,
    classSplitRE            =   /\s+/g,
    addStyleRE              =   /;\s*$/,
    addClassNameRE          =   /\s+$/,
    rte                     =   new $Event;



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

