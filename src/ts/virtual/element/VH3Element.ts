/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "h3", nodeType: 1): VH3Element&IVNodeMethod;
}
class  VH3Element extends VElement{
    align:string
}
VAP.decorate(<any>VH3Element,["align"]);