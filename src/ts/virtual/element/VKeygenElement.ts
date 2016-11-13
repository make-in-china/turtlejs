/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "keygen", nodeType?: 1): VMElement.VKeygenElement&IVNodeMethod;
}

namespace VMElement{
    export class  VKeygenElement extends VHTMLElement{
        nodeName="KEYGEN";
        autofocus:string
        challenge:string
        disabled:string
        keytype:string
        name:string
    }
    VAP.decorate(<any>VKeygenElement,["autofocus","challenge","disabled","keytype","name"]);
}