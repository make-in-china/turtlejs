
/// <reference no-default-lib="true" path="../lib/lib.d.ts" />
/// <reference path="typeprototype.ts" />
/// <reference path="is.ts" />
/// <reference path="../hashobject.ts"/>
/// <reference path="../$Event.ts"/>
/// <reference path="bind.ts"/>

interface Constructor{
    prototype:Object
}
let exec                    =	eval,
    camelCaseRE             =   /-(\w)/g,
    camelizeRE              =   /-+(.)?/g,
    deCamelizeRE            =   /[A-Z]/g,
    classSplitRE            =   /\s+/g,
    addStyleRE              =   /;\s*$/,
    addClassNameRE          =   /\s+$/,
    rte                     =   new $Event;

(<any>Node.prototype).toDOM=Node.prototype.valueOf=function(){return this}
let vNodesToDOM=function(nodes){return nodes}

interface INode{
    insertBefore2?(newChild: INode, refChild?: INode): INode;
}
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
function merge<T>(elem:T,elemEx):T{
    for(let e in elemEx){
        if(!elem.hasOwnProperty(e)){
            elem[e]=elemEx[e];
        }
    }
    return elem;
}
function takeAttr<T>(node:IElement,attrName:string,defaultValue?:T):string|T{
    if(!node.hasAttribute(attrName)){
        return defaultValue;
    }else{
        let s=node.getAttribute(attrName);
        node.removeAttribute(attrName);
        return s;
    }
}
function getAttr<T>(node:IElement,attrName:string,defaultValue?:T):string|T{
    if(!node.hasAttribute(attrName)){
        return defaultValue;
    }else{
        return node.getAttribute(attrName);
    }
}

function persentToFloat(s){
    let v=persentRE.exec(s);
    if(v){
        return parseInt(v[1])/100;
    }
}
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
// function newKeyArrayObject<T>(type:string):KeyArrayObject<T>{
//     return create(type,KeyArrayObject);
// }
// function newHashObject(type:string):HashObject<any>{
//     return create(type,HashObject);
// }
function create(type:string,tsClass?:Constructor):any{
    let s='let '+type+'=function(){};';
    if(isObject((tsClass).prototype)){
        s+=type+'.prototype=proto;';
    }
    s+='return new '+type+'();';
    return Function('proto',s)((<any>tsClass).prototype);
}
let newArrayObject=(function(){
    return function(type:string):ArrayEx<any>{
        return create(type,ArrayEx);
    }
}());

function NullValueHash(s){
    let arr=s.split(',');
    for(let i in arr){
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
function addStyle(elem,style){
        if(!style){
            return;
        }
        var oldStyle=elem.getAttribute('style');
        if(oldStyle){
            if(addStyleRE.test(oldStyle)){
                style=oldStyle+style;
            }else{
                style=oldStyle+';'+style;
            }
        }
        elem.setAttribute('style',style);
    }
    function addClassName(elem,className){
        if(!className){
            return;
        }
        var oldClass=elem.getAttribute('class');
        if(oldClass){
            if(addClassNameRE.test(oldClass)){
                className=oldClass+className;
            }else{
                className=oldClass+' '+className;
            }
        }
        elem.setAttribute('class',className);
    }
    function addClass(elem,...arg){
        addClasses(elem,arg);
    }
    function addClasses(elem,clses){
        var lst;
        if(!elem)
            return;
        lst=elem.classList;
        for(var i=0;i<clses.length;i++){
            if(!lst.contains(clses[i]))
                lst.add(clses[i]);
        }
    }
    function removeClass(elem,cls){
        var lst;
        if(!elem){
            return;
        }
        lst=elem.classList;
        if(lst.contains(cls)){
            lst.remove(cls);
        }
    }
    function removeClasses(elem,clses){
        var lst;
        if(!elem)
            return;
        lst=elem.classList;
        for(var i=0;i<clses.length;i++){
            if(lst.contains(clses[i]))
                lst.remove(clses[i]);
        }
    }
    
    function replaceClass(sel,a,b){if(sel&&a&&b)sel.className = sel.className.replace(a, b);}
    function toggleClass(sel,a,t,f) {
        if (sel && a)
            if (sel.className.indexOf(a) >= 0) {
                sel.className = sel.className.replace(a, "");
                if(f)f();
            } else {
                sel.className += " " + a;
                if(t)t();
            }
    }
function removeItem<T>(arr:T[],obj:T){
    let index=arr.indexOf(obj);
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
function camelCase(s){
    return s.replace(camelCaseRE,function(s,s1){
        return s1.toUpperCase();
    })
}
function insertNodesBefore(node:INode,nodes:INodeArray){
    let parent=node.parentNode;
    if(parent==null){
        return;
    }
    for(let i=0;i<nodes.length;i++){
        parent.insertBefore2(nodes[i],node);
    }
}
function removeNode(node:INode){
    let p:INode=node.parentNode;
    if(p){
        return p.removeChild(node);
    }else{
        return null;
    }
}
function replaceNodeByNodes(node:INode,nodes:INodeArray){
    insertNodesBefore(node,nodes)
    removeNode(node);
}
function insertNode(node:INode,childNode){
    let parent=node.parentNode;
    if(parent==null)return 0;
    parent.insertBefore2(childNode,node)
    return 0;
}
function deepClone(node:INode){
    let n=node.cloneNode();
    let ns=node.childNodes;
    for(let i=0;i<ns.length;i++){
        n.appendChild(deepClone(ns[i]));
    }
    return n;
}
function cloneBetween(node1:INode,node2:INode){
    let nodes=[];
    let l1=getNodeIndex2(node1);
    let l2=getNodeIndex2(node2);
    let p1=node1.parentNode;
    for(let i=l1+1;i<l2;i++){
        nodes.push(deepClone(p1.childNodes[i]));
    }
    return nodes;
}
function removeBlockBetween(node1:INode,node2:INode){
    let p1=node1.parentNode;
    let l1=getNodeIndex2(node1)+1;
    let l2=getNodeIndex2(node2);
    for(let i=l1;i<l2;i++){
        p1.removeChild(p1.childNodes[l1]);
    }
}
function replaceNodeByNode(node:INode,node2:INode){
    let parent=node.parentNode;
    if(parent==null){
        return;
    }
    insertNode(node,node2);
    parent.removeChild(node);
}
function appendNodes(nodes:INodeArray,parent:INode){
    let c:INodeArray=slice.call(nodes);
    for(let i=0;i<c.length;i++){
        parent.appendChild(c[i]);
    }
}
function takeChildNodes(node:INode):INodeArray{
    let c=node.childNodes;
    let length=c.length;
    let ret=[];
    for(let i=length;i>0;i--){
        ret.push(node.removeChild(c[0]));
    }
    return ret;
}
function takeOutChildNodes(node:INode):number{
    let parent=node.parentNode;
    if(parent==null){
        return 0;
    }
    let c=node.childNodes;
    let i=0;
    for(let j=c.length-1;j>-1;j--){
        parent.insertBefore2(node.removeChild(c[0]),node);
    }
    parent.removeChild(node);
    return i;
}
function takeBlockBetween(node1:INode,node2:INode):INodeArray{
    let p1=node1.parentNode;
    let ns1=p1.childNodes;
    let l1=getNodeIndex2(node1)+1;
    let l2=getNodeIndex2(node2);
    let ns=[];
    for(let i=l1;i<l2;i++){
        ns.push(p1.removeChild(ns1[l1]));
    }
    return ns;
}
function getNodesLength(node:IHTMLElement){
    if(node.parentNode){
        return (<IHTMLElement>node.parentNode).children.length;
    }
    let index=getNodeIndex(node)-1;
    node=node.nextElementSibling;
    while(node!=null){
        node=node.nextElementSibling;
        index++;
    }
    return index;
}
function getNodeIndex(node:IHTMLElement){
    let index=0;
    node=node.previousElementSibling;
    while(node!=null){
        node=node.previousElementSibling;
        index++;
    }
    return index;
}
function getNodesLength2(node:INode){
    if(node.parentNode){
        return node.parentNode.childNodes.length;
    }
    let index=getNodeIndex2(node)-1;
    node=node.nextSibling;
    while(node!=null){
        node=node.nextSibling;
        index++;
    }
    return index;
}
function getNodeIndex2(node:INode){
    let index=0;
    node=node.previousSibling;
    while(node!=null){
        node=node.previousSibling;
        index++;
    }
    return index;
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
const enum eTreeEach{
    c_stopEach=1,
    c_repeat=2,
    c_noIn=4,
    c_noRepeat=8
}
interface ITreeEachStep{
    next:number
}



interface IArray{
    length:number
}


/**
 * 遍历树
 * @param {T[]|IArray} array 数组或类数组
 * @param {string} propertyName 数组元素包含的属性名
 * @param {(node:T,step?:ITreeEachStep)=>eTreeEach|undefined} fn 回调函数
 * @param {number} beginIndex 遍历起始位置
 */
function treeEach<T>(array:T[]|IArray,propertyName:string,fn:(node:T,step?:ITreeEachStep)=>(eTreeEach|void),beginIndex:number=0){
    if(!isArrayLike(array)){
        return;
    }
    let 
        arr=array,
        i=beginIndex,
        stack:[T[]|IArray,number]=[] as [T[]|IArray,number],
        obj,
        obj2,
        state:eTreeEach|undefined,
        step:ITreeEachStep={next:1};
        
    while(true){
        if(i<arr.length){
            obj=arr[i];
            step.next=1;
            state=<eTreeEach|undefined>fn(obj,step);
            if(state==undefined){
                state=0
            }else if(state==eTreeEach.c_stopEach){
                break;
            }
            obj2=arr[i];
            if(obj2 && obj2!=obj && !(eTreeEach.c_noRepeat&state)){
                    state=state|eTreeEach.c_repeat;
            }
            if(obj2 && obj2[propertyName] && obj2[propertyName].length>0 && !(state&eTreeEach.c_noIn)&&propertyName){
                stack.push(arr);
                stack.push(i+(state&eTreeEach.c_repeat?0:step.next));
                i=0;
                arr=obj2[propertyName];
            }else{
                i+=(state&eTreeEach.c_repeat?0:step.next);
            }
        }else if(stack.length>0){
            i=<number>stack.pop();
            arr=<T[]|IArray>stack.pop();
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
        let classes = this.__elem__.className.split(classSplitRE);
        let index=classes.indexOf(value);
        if (!~index){
            classes.push(value);
            this.__elem__.className=classes.join(' ');  
        }
        
    }
    remove(value){
        let classes = this.__elem__.className.split(classSplitRE);
        let index=classes.indexOf(value);
        if (~index){
            classes.splice(index, 1);
            this.__elem__.className=classes.join(' ');  
        }
    }
    toggle(value) {
        let classes = this.__elem__.className.split(classSplitRE);
        let index=classes.indexOf(value);
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


interface Window{
    ActiveXObject?:Object
}

let isIE = !!window.ActiveXObject||"ActiveXObject" in window;
(function(){
    var insertBefore=Node.prototype.insertBefore;
    if(isIE){
        (<any>Node.prototype).insertBefore2=function(newNode,node){
            var reAppend=[];
            var n;
            switch(newNode.nodeType){
                case 3:
                    if(newNode.data===""){
                        return;
                    }
                case 8:
                    n=node.nextSibling;
                    while(n!==null){
                        reAppend.push(this.removeChild(n));
                        n=node.nextSibling;
                    }
                    reAppend.unshift(this.removeChild(node));
                    this.appendChild(newNode);
                    for(var i=0;i<reAppend.length;i++){
                        this.appendChild(reAppend[i]);
                    }
                    break;
                default:
                    insertBefore.call(this,newNode,node);
            }
        }
    }else{
        (<any>Node.prototype).insertBefore2=insertBefore;
    }
})();