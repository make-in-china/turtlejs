/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "colgroup", nodeType?: 1): VMElement.VColgroupElement&IVNodeMethod;
}
namespace VMElement{
    export class  VColgroupElement extends VHtmlElement{
        nodeName="COLGROUP";
        span:string
        align:string
        vAlign:string
        width:string
    }
    VAP.decorate(<any>VColgroupElement,["span","align","vAlign","width"]);
}