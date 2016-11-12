/// <reference path="Attribute_Property.ts"/>
class  VHTMLSCRIPTElement extends VHTMLElement{
    src:string
    type:string
    charset:string
    async:string
    defer:string
    crossOrigin:string
    event:string
    integrity:string
}
VAP.decorate(<any>VHTMLSCRIPTElement,["src","type","charset","async","defer","crossOrigin","event","integrity"]);