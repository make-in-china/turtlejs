/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "li", nodeType?: 1): VMElement.VLiElement&IVNodeMethod;
}

namespace VMElement{
    export class  VLiElement extends VHTMLElement{
        nodeName="LI";
        value:string
        type:string
    }
    VAP.decorate(<any>VLiElement,["value","type"]);
}