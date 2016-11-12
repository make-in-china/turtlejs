/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "legend", nodeType: 1): VLegendElement&IVNodeMethod;
}
class  VLegendElement extends VHTMLElement{
    align:string
}
VAP.decorate(<any>VLegendElement,["align"]);