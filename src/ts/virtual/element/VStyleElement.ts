/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "style", nodeType: 1): VStyleElement&IVNodeMethod;
}
class  VStyleElement extends VElement{
    media:string
    type:string
}
VAP.decorate(<any>VStyleElement,["media","type"]);