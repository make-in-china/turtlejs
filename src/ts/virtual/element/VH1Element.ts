/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h1", nodeType?: 1): VMElement.VH1Element&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["align"])
    export class  VH1Element extends VHtmlElement{
        nodeName="H1";
        align:string
        
    }
    
}