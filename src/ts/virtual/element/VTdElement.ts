/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "td", nodeType: 1): VTdElement&IVNodeMethod;
}
class  VTdElement extends VHTMLElement{
    colSpan:string
    rowSpan:string
    headers:string
    align:string
    axis:string
    height:string
    width:string
    noWrap:string
    vAlign:string
    bgColor:string
    abbr:string
    scope:string
}
VAP.decorate(<any>VTdElement,["colSpan","rowSpan","headers","align","axis","height","width","noWrap","vAlign","bgColor","abbr","scope"]);