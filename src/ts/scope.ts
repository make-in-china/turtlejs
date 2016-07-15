
/// <reference path="core.ts" />
let 
    $rootScope:Scope;
interface INode{
    __scope__:Scope;
}

interface ITurtle{
    domScope:DOMScope;
}
class Scope {
    constructor(public __commentNode__:INode,parent,public __name__:string){
        this.__actionNode__=__commentNode__.parentNode;
        this.__parent__=parent;
        this.__proto__=parent;
        __commentNode__.parentNode.__scope__=this;
        parent.__children__.push(this);
        if(__name__){
            parent[__name__]=this;
        }
    }
    __actionNode__:INode
    __parent__:Scope;
    __children__:Scope[]=[];
    __proto__
}
class DOMScope{
    stack:Scope[]
    constructor(){
        this.stack=[$rootScope];
    }
    create(node,name){
        var scope=this.get(node);
        if(node.parentNode!==scope.__actionNode__){
            scope=new Scope(node,scope,name);
            this.stack.push(scope);
        }else/* if(scope.__name__!==name)*/{
            throwError('当前层不允许重复定义scope:'+name);
        }
        return scope;
    }
    get(node){
        if(!node)
            return $rootScope;
        while(node!=null){
            if(node.scope){
                return node.scope;
            }
            node=node.parentNode;
        }
        return $rootScope;
    }
    cut(scope){
        var p=scope.__parent__;
        scope.__parent__=null;
        removeItem(p.__children__,scope);
        delete p[scope.name];
    }
    link(scope,node){
        var p=$t.domScope.get(node);
        if(!p){
            return;
        }
        scope.__parent__=p;
        p.__children__.push(scope);
        if(name){
            p[name]=scope;
        }
    }
}