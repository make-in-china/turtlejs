/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "tfoot", nodeType?: 1): VMElement.VTfootElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["align","vAlign"])
    export class  VTfootElement extends VHtmlElement{
        nodeName="TFOOT";
        align:string
        vAlign:string
        
    }
    
}