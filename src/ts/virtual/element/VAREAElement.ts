/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "area", nodeType: 1): VAREAElement&IVNodeMethod;
}
class  VAREAElement extends VHTMLElement{
    alt:string
    coords:string
    shape:string
    target:string
    ping:string
    noHref:string
    href:string
}
VAP.decorate(<any>VAREAElement,["alt","coords","shape","target","ping","noHref","href"]);