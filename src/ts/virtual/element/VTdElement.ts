/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "td", nodeType?: 1): VMElement.VTdElement&IVNodeMethod;
}

namespace VMElement{
    export class  VTdElement extends VHTMLElement{
        nodeName="TD";
        colSpan:string
        rowSpan:string
        headers:string
        align:string
        axis:string
        height:string
        width:string
        noWrap:string
        vAlign:string
        bgColor:string
        abbr:string
        scope:string
    }
    VAP.decorate(<any>VTdElement,["colSpan","rowSpan","headers","align","axis","height","width","noWrap","vAlign","bgColor","abbr","scope"]);
}