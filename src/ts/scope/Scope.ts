
/// <reference path='RootScope.ts'/>
/// <reference path='DOMScope.ts'/>
interface INode{
    __scope__?:Scope;
}

class Scope {
    public __actionNode__:INode
    public __parent__:Scope|RootScope|null
    public __children__:Scope[]=[]
    public __proto__:Object|Scope
    constructor(public __commentNode__:INode,parent:Scope|RootScope,public __name__?:string){
        this.__actionNode__=__commentNode__.parentNode;
        this.__parent__=parent;
        this.__proto__=parent;
        __commentNode__.parentNode.__scope__=this;
        parent.__children__.push(this);
        if(__name__){
            parent[__name__]=this;
        }
    }
}
