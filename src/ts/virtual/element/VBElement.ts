/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "b", nodeType?: 1): VMElement.VBElement&IVNodeMethod;
}
namespace VMElement{
    export class VBElement extends VHtmlElement{
        nodeName="B"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VBElement,["title","lang","accessKey","webkitdropzone","id"]);
}