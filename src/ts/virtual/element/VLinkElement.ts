/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "link", nodeType?: 1): VMElement.VLinkElement &IVNodeMethod;
}

namespace VMElement{
    export class  VLinkElement extends VHTMLElement{
        nodeName="LINK";
        __closeSelf__=true;
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
}