/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "col", nodeType?: 1): VMElement.VColElement&IVNodeMethod;
}
namespace VMElement{
    export class  VColElement extends VHTMLElement{
        nodeName="COL";
        __closeSelf__=true;
        span:string
        align:string
        vAlign:string
        width:string
    }
    VAP.decorate(<any>VColElement,["span","align","vAlign","width"]);
}