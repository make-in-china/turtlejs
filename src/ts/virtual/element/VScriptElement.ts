/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "script", nodeType?: 1): VMElement.VScriptElement&IVNodeMethod;
}

namespace VMElement{
    export class  VScriptElement extends VHTMLElement{
        nodeName="SCRIPT";
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
}