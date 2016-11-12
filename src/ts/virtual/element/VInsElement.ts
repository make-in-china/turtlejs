/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "ins", nodeType: 1): VInsElement&IVNodeMethod;
}
class  VInsElement extends VElement{
    cite:string
    dateTime:string
}
VAP.decorate(<any>VInsElement,["cite","dateTime"]);