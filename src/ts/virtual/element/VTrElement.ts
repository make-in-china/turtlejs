/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "tr", nodeType?: 1): VMElement.VTrElement&IVNodeMethod;
}

namespace VMElement{
    export class  VTrElement extends VHtmlElement{
        nodeName="TR";
        align:string
        vAlign:string
        bgColor:string
    }
    VAP.decorate(<any>VTrElement,["align","vAlign","bgColor"]);
}