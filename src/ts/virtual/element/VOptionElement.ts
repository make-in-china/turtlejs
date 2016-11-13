/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "option", nodeType?: 1): VMElement.VOptionElement&IVNodeMethod;
}

namespace VMElement{
    export class  VOptionElement extends VHTMLElement{
        nodeName="OPTION";
        disabled:string
        label:string
        selected:string
        value:string
    }
    VAP.decorate(<any>VOptionElement,["disabled","label","selected","value"]);
}