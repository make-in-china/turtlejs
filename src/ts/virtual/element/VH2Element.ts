/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "h2", nodeType: 1): VH2Element&IVNodeMethod;
}
class  VH2Element extends VHTMLElement{
    align:string
}
VAP.decorate(<any>VH2Element,["align"]);