/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "h6", nodeType: 1): VH6Element&IVNodeMethod;
}
class  VH6Element extends VElement{
    align:string
}
VAP.decorate(<any>VH6Element,["align"]);