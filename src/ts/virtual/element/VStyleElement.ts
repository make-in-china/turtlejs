/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "style", nodeType?: 1): VMElement.VStyleElement&IVNodeMethod;
}

namespace VMElement{
    export class  VStyleElement extends VHTMLElement{
        nodeName="STYLE";
        media:string
        type:string
    }
    VAP.decorate(<any>VStyleElement,["media","type"]);
}