/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "col", nodeType: 1): VColElement&IVNodeMethod;
}
class  VColElement extends VHTMLElement{
    span:string
    align:string
    vAlign:string
    width:string
}
VAP.decorate(<any>VColElement,["span","align","vAlign","width"]);