
/// <reference path='VNode.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.DocumentType): VDocumentType&IVNodeMethod;
}
function isVDocType(node: VNode): node is VDocumentType {
    return node.nodeType === ENodeType.DocumentType
}
class VDocumentType extends VNode{
    nodeType:ENodeType.DocumentType=ENodeType.DocumentType
    nodeName="html"
    cloneNode(deep:boolean):VDocumentType&IVNodeMethod{
        return $$$("",ENodeType.DocumentType);
    }
    toCreateJS(space:number=0):string{
        return `("",${ENodeType.DocumentType})`;
    }
    toJS():string{
        return this.toCreateJS()+'.$';
    }
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation():void{}
    toHTMLString():string[]{
        return ['<!DOCTYPE html>'];
    }
}