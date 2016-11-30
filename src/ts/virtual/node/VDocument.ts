
/// <reference path='VNode.ts'/>

interface IVNodeMethod{
    (nodeName: "#document", nodeType?: 1): VDocument&IVNodeMethod;
}
class VDocument extends VNode{
    nodeType:ENodeType=ENodeType.Element;
    nodeName="#document"
    
    cloneNode(deep:boolean):VDocument&IVNodeMethod{
        throw new Error("本标签不支持cloneNode");
    }
    toJS():string{
        throw new Error("本标签不支持输出JS");
    }
    protected emulation():void{}
    toHTMLString():string[]{
        throw new Error("本标签不支持输出HTML");
    }
}