/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "basefont", nodeType?: 1): VMElement.VBasefontElement&IVNodeMethod;
}
namespace VMElement{
    export class VBasefontElement extends VHTMLElement{
        nodeName="BASEFONT"
        __closeSelf__=true;
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VBasefontElement,["title","lang","accessKey","webkitdropzone","id"]);
}