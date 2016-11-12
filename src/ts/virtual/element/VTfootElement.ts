/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "tfoot", nodeType: 1): VTfootElement&IVNodeMethod;
}
class  VTfootElement extends VHTMLElement{
    align:string
    vAlign:string
}
VAP.decorate(<any>VTfootElement,["align","vAlign"]);