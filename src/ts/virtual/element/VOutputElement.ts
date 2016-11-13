/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "output", nodeType?: 1): VMElement.VOutputElement&IVNodeMethod;
}

namespace VMElement{
    export class  VOutputElement extends VHTMLElement{
        nodeName="OUTPUT";
        name:string
    }
    VAP.decorate(<any>VOutputElement,["name"]);
}