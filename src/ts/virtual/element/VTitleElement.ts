/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "title", nodeType?: 1): VMElement.VTitleElement&IVNodeMethod;
}
namespace VMElement{
    export class VTitleElement extends VHtmlElement{
        nodeName="TITLE"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VTitleElement,["title","lang","accessKey","webkitdropzone","id"]);
}