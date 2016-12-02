/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "q", nodeType?: 1): VMElement.VQElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({cite:''})
    export class  VQElement extends VHtmlElement{
        nodeName="Q";
        cite:string
        
    }
    
}