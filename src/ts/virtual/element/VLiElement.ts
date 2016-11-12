/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "li", nodeType: 1): VLiElement&IVNodeMethod;
}
class  VLiElement extends VElement{
    value:string
    type:string
}
VAP.decorate(<any>VLiElement,["value","type"]);