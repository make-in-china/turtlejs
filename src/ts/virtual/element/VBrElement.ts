/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "br", nodeType: 1): VBrElement&IVNodeMethod;
}
class  VBrElement extends VHTMLElement{
    clear:string
}
VAP.decorate(<any>VBrElement,["clear"]);