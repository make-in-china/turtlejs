/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "label", nodeType?: 1): VMElement.VLabelElement&IVNodeMethod;
}
namespace VMElement{
    export class VLabelElement extends VHtmlElement{
        nodeName="LABEL"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VLabelElement,["title","lang","accessKey","webkitdropzone","id"]);
}