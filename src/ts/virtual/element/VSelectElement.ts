/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "select", nodeType: 1): VSelectElement&IVNodeMethod;
}
class  VSelectElement extends VElement{
    autofocus:string
    disabled:string
    multiple:string
    name:string
    required:string
    size:string
}
VAP.decorate(<any>VSelectElement,["autofocus","disabled","multiple","name","required","size"]);