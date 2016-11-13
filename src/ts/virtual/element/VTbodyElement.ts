/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "tbody", nodeType?: 1): VMElement.VTbodyElement&IVNodeMethod;
}

namespace VMElement{
    export class  VTbodyElement extends VHtmlElement{
        nodeName="TBODY";
        align:string
        vAlign:string
    }
    VAP.decorate(<any>VTbodyElement,["align","vAlign"]);
}