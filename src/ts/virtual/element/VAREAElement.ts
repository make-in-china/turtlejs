/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "area", nodeType?: 1): VMElement.VAreaElement&IVNodeMethod;
}
namespace VMElement{
    export class  VAreaElement extends VHTMLElement{
        nodeName="AREA";
        __closeSelf__=true;
        alt:string
        coords:string
        shape:string
        target:string
        ping:string
        noHref:string
        href:string
    }
    VAP.decorate(<any>VAreaElement,["alt","coords","shape","target","ping","noHref","href"]);
}