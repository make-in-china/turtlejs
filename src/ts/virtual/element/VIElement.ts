/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "i", nodeType?: 1): VMElement.VIElement&IVNodeMethod;
}
namespace VMElement{
    export class VIElement extends VHtmlElement{
        nodeName="I"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VIElement,["title","lang","accessKey","webkitdropzone","id"]);
}