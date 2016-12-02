/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "tr", nodeType?: 1): VMElement.VTrElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["align","vAlign","bgColor"])
    export class  VTrElement extends VHtmlElement{
        nodeName="TR";
        align:string
        vAlign:string
        bgColor:string
    }
    
}