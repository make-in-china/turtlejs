/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "q", nodeType?: 1): VMElement.VQElement&IVNodeMethod;
}

namespace VMElement{
    export class  VQElement extends VHTMLElement{
        nodeName="Q";
        cite:string
    }
    VAP.decorate(<any>VQElement,["cite"]);
}