/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "p", nodeType: 1): VPElement&IVNodeMethod;
}
class  VPElement extends VHTMLElement{
    align:string
}
VAP.decorate(<any>VPElement,["align"]);