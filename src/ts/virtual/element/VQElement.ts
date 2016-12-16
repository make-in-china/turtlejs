/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "q", nodeType?: 1): VMDOM.VQElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({cite:''})
    export class  VQElement extends VHtmlElement{
        nodeName="Q";
        cite:string
        
    }
    
}