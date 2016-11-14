/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dd", nodeType?: 1): VMElement.VDdElement&IVNodeMethod;
}
namespace VMElement{
    export class VDdElement extends VHtmlElement{
        nodeName="DD"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VDdElement,["title","lang","accessKey","webkitdropzone","id"]);
}