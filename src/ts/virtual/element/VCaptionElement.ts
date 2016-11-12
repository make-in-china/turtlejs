/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "caption", nodeType: 1): VCaptionElement&IVNodeMethod;
}
class  VCaptionElement extends VElement{
    align:string
}
VAP.decorate(<any>VCaptionElement,["align"]);