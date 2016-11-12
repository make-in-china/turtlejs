/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "colgroup", nodeType: 1): VColgroupElement&IVNodeMethod;
}
class  VColgroupElement extends VElement{
    span:string
    align:string
    vAlign:string
    width:string
}
VAP.decorate(<any>VColgroupElement,["span","align","vAlign","width"]);