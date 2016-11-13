
/// <reference path='VNode.ts'/>
class VDocumentType extends VNode{
    nodeType:VNodeType=10
    nodeName="html"
    protected toJS():string{
        return `("",10)`;
    }
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation():void{}
    toXMLNodeString():string[]{
        return ['<!DOCTYPE html>'];
    }
}