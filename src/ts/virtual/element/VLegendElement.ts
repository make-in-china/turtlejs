/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "legend", nodeType?: 1): VMElement.VLegendElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["align"])
    export class  VLegendElement extends VHtmlElement{
        nodeName="LEGEND";
        align:string
        
    }
    
}