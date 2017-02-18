
/// <reference path='Scope.ts'/>
/// <reference path='../part/Part.ts'/>
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
    lastRenderPart:Component.Part
}