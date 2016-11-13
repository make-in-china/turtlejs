/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "th", nodeType?: 1): VMElement.VThElement&IVNodeMethod;
}

namespace VMElement{
    export class  VThElement extends VHTMLElement{
        nodeName="TH";
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
    VAP.decorate(<any>VThElement,["colSpan","rowSpan","headers","align","axis","height","width","noWrap","vAlign","bgColor","abbr","scope"]);
}