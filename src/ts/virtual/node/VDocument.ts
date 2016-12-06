
/// <reference path='VNode.ts'/>

interface IVNodeMethod{
    (nodeName: "#document", nodeType?: ENodeType.Element): VDocument&IVNodeMethod;
}
class VDocument extends VNode{
    nodeType:ENodeType.Element=ENodeType.Element;
    nodeName="#document"
    
    cloneNode(deep:boolean):VDocument&IVNodeMethod{
        throw new Error("本标签不支持cloneNode");
    }
    toCreateJS(space:number=0):string{
        throw new Error("本标签不支持输出JS");
    }
    toJS():string{
        throw new Error("本标签不支持输出JS");
    }
    protected emulation():void{}
    toHTMLString():string[]{
        throw new Error("本标签不支持输出HTML");
    }
}