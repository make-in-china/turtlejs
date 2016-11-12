/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "legend", nodeType: 1): VLegendElement&IVNodeMethod;
}
class  VLegendElement extends VElement{
    align:string
}
VAP.decorate(<any>VLegendElement,["align"]);