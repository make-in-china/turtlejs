/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h6", nodeType?: 1): VMElement.VH6Element&IVNodeMethod;
}
namespace VMElement{
    export class  VH6Element extends VHTMLElement{
        nodeName="H6";
        align:string
    }
    VAP.decorate(<any>VH6Element,["align"]);
}