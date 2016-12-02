/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "p", nodeType?: 1): VMElement.VPElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({align:''})
    export class  VPElement extends VHtmlElement{
        nodeName="P";
        align:string
        
    }
    
}