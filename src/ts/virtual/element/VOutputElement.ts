/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "output", nodeType: 1): VOutputElement&IVNodeMethod;
}
class  VOutputElement extends VHTMLElement{
    name:string
}
VAP.decorate(<any>VOutputElement,["name"]);