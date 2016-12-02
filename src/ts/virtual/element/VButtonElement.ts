/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "button", nodeType?: 1): VMElement.VButtonElement&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["formTarget","name","value","title","lang","accessKey","webkitdropzone","id"])
    export class VButtonElement extends VHtmlElement{
        nodeName="BUTTON"
        formTarget:string
        name:string
        value:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}