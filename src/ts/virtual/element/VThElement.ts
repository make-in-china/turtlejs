/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "th", nodeType: 1): VThElement&IVNodeMethod;
}
class  VThElement extends VElement{
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
VAP.decorate(<any>VThElement,["colSpan","rowSpan","headers","align","axis","height","width","noWrap","vAlign","bgColor","abbr","scope"]);