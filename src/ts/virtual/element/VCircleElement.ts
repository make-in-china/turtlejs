/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "circle", nodeType?: 1): VMElement.VCircleElement&IVNodeMethod;
}
namespace VMElement{
    export class VCircleElement extends VHtmlElement{
        nodeName="CIRCLE"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VCircleElement,["title","lang","accessKey","webkitdropzone","id"]);
}