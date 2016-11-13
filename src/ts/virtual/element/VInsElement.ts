/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "ins", nodeType?: 1): VMElement.VInsElement&IVNodeMethod;
}

namespace VMElement{
    export class  VInsElement extends VHTMLElement{
        nodeName="INS";
        cite:string
        dateTime:string
    }
    VAP.decorate(<any>VInsElement,["cite","dateTime"]);
}