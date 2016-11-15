/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "header", nodeType?: 1): VMElement.VHeaderElement&IVNodeMethod;
}
namespace VMElement{
    export class VHeaderElement extends VHtmlElement{
        nodeName="HEADER"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VHeaderElement,["title","lang","accessKey","webkitdropzone","id"]);
}