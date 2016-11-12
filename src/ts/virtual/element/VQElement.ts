/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "q", nodeType: 1): VQElement&IVNodeMethod;
}
class  VQElement extends VElement{
    cite:string
}
VAP.decorate(<any>VQElement,["cite"]);