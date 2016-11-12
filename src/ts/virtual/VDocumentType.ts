
/// <reference path='VNode.ts'/>
class VDocumentType extends VNode{
    
    __domNode__:DocumentType;
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation():void{

    }
}