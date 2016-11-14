/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "button", nodeType?: 1): VMElement.VButtonElement&IVNodeMethod;
}
namespace VMElement{
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
    VAP.decorate(<any>VButtonElement,["formTarget","name","value","title","lang","accessKey","webkitdropzone","id"]);
}