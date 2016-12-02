/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "p", nodeType?: 1): VMElement.VPElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["align"])
    export class  VPElement extends VHtmlElement{
        nodeName="P";
        align:string
        
    }
    
}