/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "table", nodeType: 1): VTableElement&IVNodeMethod;
}
class  VTableElement extends VHTMLElement{
    align:string
    border:string
    frame:string
    rules:string
    summary:string
    width:string
    bgColor:string
    cellPadding:string
    cellSpacing:string
}
VAP.decorate(<any>VTableElement,["align","border","frame","rules","summary","width","bgColor","cellPadding","cellSpacing"]);