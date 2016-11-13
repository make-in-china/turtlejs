/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "progress", nodeType?: 1): VMElement.VProgressElement&IVNodeMethod;
}

namespace VMElement{
    export class  VProgressElement extends VHtmlElement{
        nodeName="PROGRESS";
        value:string
        max:string
    }
    VAP.decorate(<any>VProgressElement,["value","max"]);
}