/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "basefont", nodeType?: 1): VMElement.VBasefontElement&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["title","lang","accessKey","webkitdropzone","id"])
    export class VBasefontElement extends VHtmlElement{
        nodeName="BASEFONT"
        __closeSelf__=true;
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}