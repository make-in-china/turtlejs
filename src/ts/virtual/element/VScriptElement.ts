/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "script", nodeType: 1): VScriptElement&IVNodeMethod;
}
class  VScriptElement extends VHTMLElement{
    src:string
    type:string
    charset:string
    async:string
    defer:string
    crossOrigin:string
    event:string
    integrity:string
}
VAP.decorate(<any>VScriptElement,["src","type","charset","async","defer","crossOrigin","event","integrity"]);