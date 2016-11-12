/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "h1", nodeType: 1): VH1Element&IVNodeMethod;
}
class  VH1Element extends VElement{
    align:string
}
VAP.decorate(<any>VH1Element,["align"]);