/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "strong", nodeType?: 1): VMElement.VStrongElement&IVNodeMethod;
}
namespace VMElement{
    export class VStrongElement extends VHtmlElement{
        nodeName="STRONG"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VStrongElement,["title","lang","accessKey","webkitdropzone","id"]);
}