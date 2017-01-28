
interface INode{
    __scope__?:Scope;
}

class Scope {
    __actionNode__:INode
    __parent__:Scope|null
    __children__:Scope[]=[]
    __proto__:Scope|null
    constructor(commentNode:IComment,parent:Scope|null,public __name__?:string){
        let p=commentNode.parentNode;
        if(!p){
            throw new Error("Scope必须附加在节点上！");
        }
        this.__actionNode__=p;
        this.__parent__=parent;
        this.__proto__=parent;
        if(p)p.__scope__=this;
        if(parent){
            parent.__children__.push(this);
            if(__name__){
                parent[__name__]=this;
            }
        }
    }
}
class RootScope implements Scope{
    __actionNode__:INode
    __parent__:null=null
    __children__:Scope[]=[]
    __proto__:Scope|null
    __name__:undefined
    constructor(public document:INode){
        this.__actionNode__=document;
        document.__scope__=this;
    }
}