/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "head", nodeType?: 1): VMElement.VHeadElement&IVNodeMethod;
}
namespace VMElement{
    export class  VHeadElement extends VHTMLElement{
        nodeName="HEAD";
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VHeadElement,["title", "lang", "accessKey", "webkitdropzone", "id"]);
}