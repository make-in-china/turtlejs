/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "progress", nodeType: 1): VProgressElement&IVNodeMethod;
}
class  VProgressElement extends VElement{
    value:string
    max:string
}
VAP.decorate(<any>VProgressElement,["value","max"]);