/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "hr", nodeType: 1): VHrElement&IVNodeMethod;
}
class  VHrElement extends VHTMLElement{
    align:string
    color:string
    noShade:string
    size:string
    width:string
}
VAP.decorate(<any>VHrElement,["align","color","noShade","size","width"]);