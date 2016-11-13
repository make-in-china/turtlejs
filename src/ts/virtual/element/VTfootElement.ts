/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "tfoot", nodeType?: 1): VMElement.VTfootElement&IVNodeMethod;
}

namespace VMElement{
    export class  VTfootElement extends VHtmlElement{
        nodeName="TFOOT";
        align:string
        vAlign:string
    }
    VAP.decorate(<any>VTfootElement,["align","vAlign"]);
}