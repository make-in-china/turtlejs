/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "link", nodeType: 1): VLinkElement &IVNodeMethod;
}
class  VLinkElement extends VHTMLElement{
    disabled:string
    href:string
    crossOrigin:string
    rel:string
    media:string
    hreflang:string
    type:string
    charset:string
    rev:string
    target:string
    integrity:string
}
VAP.decorate(<any>VLinkElement,["disabled","href","crossOrigin","rel","media","hreflang","type","charset","rev","target","integrity"]);