/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "body", nodeType?: 1): VMElement.VBodyElement&IVNodeMethod;
}
namespace VMElement{
    export class  VBodyElement extends VHTMLElement{
        nodeName="BODY";
        text:string
        link:string
        vLink:string
        aLink:string
        bgColor:string
        background:string
    }
    VAP.decorate(<any>VBodyElement,["text","link","vLink","aLink","bgColor","background"]);
}