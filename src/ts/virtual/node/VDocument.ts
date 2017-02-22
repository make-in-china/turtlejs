
/// <reference path='VNode.ts'/>
interface VNodeNames{
    '#document':VMDOM.VDocument&IVNodeMethod
}
interface IVNodeMethod{
    (nodeName: null, nodeType?: ENodeType.Document): VMDOM.VDocument&IVNodeMethod;
}
namespace VMDOM{
    @register('#document',ENodeType.Document)
    export abstract class VDocument extends VNode{
        nodeType:ENodeType.Document=ENodeType.Document;
        nodeName:"#document"="#document"
        
        cloneNode():VDocument&IVNodeMethod{
            throw new Error("本标签不支持cloneNode");
        }
        toCreateJS():string{
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
}