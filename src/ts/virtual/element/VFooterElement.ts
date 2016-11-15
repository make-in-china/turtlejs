/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "footer", nodeType?: 1): VMElement.VFooterElement&IVNodeMethod;
}
namespace VMElement{
    export class VFooterElement extends VHtmlElement{
        nodeName="FOOTER"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VFooterElement,["title","lang","accessKey","webkitdropzone","id"]);
}