/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "base", nodeType?: 1): VMElement.VBaseElement&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["href","target"])
    export class  VBaseElement extends VHtmlElement{
        nodeName="BASE";
        __closeSelf__=true;
        href:string
        target:string
        
    }
    
}