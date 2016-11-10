
/// <reference path='RootScope.ts'/>
/// <reference path='DOMScope.ts'/>
interface INode{
    __scope__?:Scope;
}

class Scope {
    public __actionNode__:INode|null
    public __parent__:Scope|RootScope|null
    public __children__:Scope[]=[]
    public __proto__:Object|Scope
    constructor(public __commentNode__:INode,parent:Scope|RootScope,public __name__?:string){
        let p=__commentNode__.parentNode
        this.__actionNode__=p;
        this.__parent__=parent;
        this.__proto__=parent;
        if(p)p.__scope__=this;
        parent.__children__.push(this);
        if(__name__){
            parent[__name__]=this;
        }
    }
}
