/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "blockquote", nodeType?: 1): VMDOM.VBlockquoteElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({cite:''})
    export class  VBlockquoteElement extends VHtmlElement{
        nodeName="BLOCKQUOTE";
        cite:string
        
    }
    
}