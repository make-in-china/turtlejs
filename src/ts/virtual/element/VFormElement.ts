/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "form", nodeType?: 1): VMElement.VFormElement&IVNodeMethod;
}
namespace VMElement{
    export class VFormElement extends VHtmlElement{
        nodeName="FORM"
        name:string
        target:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VFormElement,["name","target","title","lang","accessKey","webkitdropzone","id"]);
}