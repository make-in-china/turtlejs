/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "thead", nodeType: 1): VTheadElement&IVNodeMethod;
}
class  VTheadElement extends VElement{
    align:string
    vAlign:string
}
VAP.decorate(<any>VTheadElement,["align","vAlign"]);