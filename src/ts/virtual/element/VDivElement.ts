/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "div", nodeType: 1): VDivElement&IVNodeMethod;
}
class  VDivElement extends VHTMLElement{
    align:string
}
VAP.decorate(<any>VDivElement,["align"]);