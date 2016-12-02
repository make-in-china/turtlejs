/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "table", nodeType?: 1): VMElement.VTableElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["align","border","frame","rules","summary","width","bgColor","cellPadding","cellSpacing"])
    export class  VTableElement extends VHtmlElement{
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
    
}