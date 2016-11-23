
/// <reference path='VNode.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: 10): VDocumentType&IVNodeMethod;
}
function isVDocType(node: VNode): node is VDocumentType {
    return node.nodeType === 10
}
class VDocumentType extends VNode{
    nodeType:VNodeType=10
    nodeName="html"
    cloneNode(deep:boolean):VDocumentType&IVNodeMethod{
        return $$$("",10);
    }
    toJS():string{
        return `("",10)`;
    }
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation():void{}
    toHTMLString():string[]{
        return ['<!DOCTYPE html>'];
    }
}