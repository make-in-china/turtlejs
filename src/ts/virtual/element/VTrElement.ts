/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "tr", nodeType: 1): VTrElement&IVNodeMethod;
}
class  VTrElement extends VElement{
    align:string
    vAlign:string
    bgColor:string
}
VAP.decorate(<any>VTrElement,["align","vAlign","bgColor"]);