/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "tbody", nodeType?: 1): VMElement.VTbodyElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["align","vAlign"])
    export class  VTbodyElement extends VHtmlElement{
        nodeName="TBODY";
        align:string
        vAlign:string
        
    }
    
}