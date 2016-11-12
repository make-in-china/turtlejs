/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "tbody", nodeType: 1): VTbodyElement&IVNodeMethod;
}
class  VTbodyElement extends VHTMLElement{
    align:string
    vAlign:string
}
VAP.decorate(<any>VTbodyElement,["align","vAlign"]);