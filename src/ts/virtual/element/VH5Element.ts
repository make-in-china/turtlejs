/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h5", nodeType?: 1): VMElement.VH5Element&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["align"])
    export class  VH5Element extends VHtmlElement{
        nodeName="H5";
        align:string
        
    }
    
}