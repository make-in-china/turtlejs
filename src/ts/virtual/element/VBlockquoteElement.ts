/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "blockquote", nodeType?: 1): VMElement.VBlockquoteElement&IVNodeMethod;
}
namespace VMElement{
    export class  VBlockquoteElement extends VHtmlElement{
        nodeName="BLOCKQUOTE";
        cite:string
    }
    VAP.decorate(<any>VBlockquoteElement,["cite"]);
}