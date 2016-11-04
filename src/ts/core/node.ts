
/// <reference path="../lib/lib.d.ts" />
interface INode{
    insertBefore2(newChild: INode, refChild?: INode): INode;
}
interface Node{
    toDOM():Node
    valueOf():Node
}
Node.prototype.toDOM=
Node.prototype.valueOf=function(){
    return this
}
let vNodesToDOM=function(nodes:INode[]){
    return nodes
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

function takeAttr<T>(node:IElement,attrName:string,defaultValue?:T):string|T|undefined{
    if(!node.hasAttribute(attrName)){
        return defaultValue;
    }else{
        let s=node.getAttribute(attrName);
        node.removeAttribute(attrName);
        return s;
    }
}
function getAttr<T>(node:IElement,attrName:string,defaultValue?:T):string|T|undefined{
    if(!node.hasAttribute(attrName)){
        return defaultValue;
    }else{
        return node.getAttribute(attrName);
    }
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
