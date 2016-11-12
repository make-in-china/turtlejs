/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "pre", nodeType: 1): VPreElement&IVNodeMethod;
}
class  VPreElement extends VElement{
    width:string
}
VAP.decorate(<any>VPreElement,["width"]);