/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h4", nodeType?: 1): VMElement.VH4Element&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["align"])
    export class  VH4Element extends VHtmlElement{
        nodeName="H4";
        align:string
        
    }
    
}