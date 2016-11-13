/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "table", nodeType?: 1): VMElement.VTableElement&IVNodeMethod;
}

namespace VMElement{
    export class  VTableElement extends VHTMLElement{
        nodeName="TABLE";
        align:string
        border:string
        frame:string
        rules:string
        summary:string
        width:string
        bgColor:string
        cellPadding:string
        cellSpacing:string
    }
    VAP.decorate(<any>VTableElement,["align","border","frame","rules","summary","width","bgColor","cellPadding","cellSpacing"]);
}