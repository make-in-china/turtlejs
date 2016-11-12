/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "h5", nodeType: 1): VH5Element&IVNodeMethod;
}
class  VH5Element extends VElement{
    align:string
}
VAP.decorate(<any>VH5Element,["align"]);