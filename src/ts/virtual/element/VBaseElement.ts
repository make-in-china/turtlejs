/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "base", nodeType: 1): VBaseElement&IVNodeMethod;
}
class  VBaseElement extends VElement{
    href:string
    target:string
}
VAP.decorate(<any>VBaseElement,["href","target"]);