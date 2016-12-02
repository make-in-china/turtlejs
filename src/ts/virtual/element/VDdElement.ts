/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dd", nodeType?: 1): VMElement.VDdElement&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["title","lang","accessKey","webkitdropzone","id"])
    export class VDdElement extends VHtmlElement{
        nodeName="DD"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}