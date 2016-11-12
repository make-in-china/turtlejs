/// <reference path="Attribute_Property.ts"/>

interface IVNodeMethod{
    (name: "a", nodeType: 1): VHTMLAElement&IVNodeMethod;
}
class  VHTMLAElement extends VHTMLElement{
    target:string
    download:string
    ping:string
    rel:string
    hreflang:string
    type:string
    coords:string
    charset:string
    name:string
    rev:string
    shape:string
    href:string
}
VAP.decorate(<any>VHTMLAElement,["target", "download", "ping", "rel", "hreflang", "type", "coords", "charset", "name", "rev", "shape", "href"]);