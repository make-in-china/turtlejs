/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "li", nodeType: 1): VLiElement&IVNodeMethod;
}
class  VLiElement extends VHTMLElement{
    value:string
    type:string
}
VAP.decorate(<any>VLiElement,["value","type"]);