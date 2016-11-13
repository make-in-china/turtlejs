/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "div", nodeType?: 1): VMElement.VDivElement&IVNodeMethod;
}
namespace VMElement{
    export class  VDivElement extends VHTMLElement{
        nodeName="DIV"
        align:string
    }
    VAP.decorate(<any>VDivElement,["align"]);
}