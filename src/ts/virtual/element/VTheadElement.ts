/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "thead"): VMElement.VTheadElement&IVNodeMethod;
    (nodeName: "thead", nodeType: 1): VMElement.VTheadElement&IVNodeMethod;
}

namespace VMElement{
    export class  VTheadElement extends VHTMLElement{
        align:string
        vAlign:string
    }
    VAP.decorate(<any>VTheadElement,["align","vAlign"]);
}