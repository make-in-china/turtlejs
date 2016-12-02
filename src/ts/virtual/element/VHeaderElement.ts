/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "header", nodeType?: 1): VMElement.VHeaderElement&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["title","lang","accessKey","webkitdropzone","id"])
    export class VHeaderElement extends VHtmlElement{
        nodeName="HEADER"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}