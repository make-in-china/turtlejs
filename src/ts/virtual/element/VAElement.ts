/// <reference path="../Attribute_Property.ts"/>

interface IVNodeMethod{
    (nodeName: "a", nodeType?: 1): VMElement.VAElement&IVNodeMethod;
}
namespace VMElement{
    export class VAElement extends VHTMLElement{
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
    VAP.decorate(<any>VAElement,["target", "download", "ping", "rel", "hreflang", "type", "coords", "charset", "name", "rev", "shape", "href"]);
}