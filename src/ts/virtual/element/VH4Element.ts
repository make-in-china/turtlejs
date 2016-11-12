/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "h4", nodeType: 1): VH4Element&IVNodeMethod;
}
class  VH4Element extends VHTMLElement{
    align:string
}
VAP.decorate(<any>VH4Element,["align"]);