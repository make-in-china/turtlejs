/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "em", nodeType?: 1): VMElement.VEmElement&IVNodeMethod;
}
namespace VMElement{
    export class VEmElement extends VHtmlElement{
        nodeName="EM"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VEmElement,["title","lang","accessKey","webkitdropzone","id"]);
}