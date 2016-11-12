/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "dialog", nodeType: 1): VDialogElement&IVNodeMethod;
}
class  VDialogElement extends VElement{
    open:string
}
VAP.decorate(<any>VDialogElement,["open"]);