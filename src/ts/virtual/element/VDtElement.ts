/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dt", nodeType?: 1): VMElement.VDtElement&IVNodeMethod;
}
namespace VMElement{
    export class VDtElement extends VHtmlElement{
        nodeName="DT"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VDtElement,["title","lang","accessKey","webkitdropzone","id"]);
}