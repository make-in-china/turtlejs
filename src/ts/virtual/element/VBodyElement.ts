/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "body", nodeType: 1): VBodyElement&IVNodeMethod;
}
class  VBodyElement extends VHTMLElement{
    text:string
    link:string
    vLink:string
    aLink:string
    bgColor:string
    background:string
}
VAP.decorate(<any>VBodyElement,["text","link","vLink","aLink","bgColor","background"]);