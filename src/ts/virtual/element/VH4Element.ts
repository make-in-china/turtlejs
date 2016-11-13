/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h4", nodeType?: 1): VMElement.VH4Element&IVNodeMethod;
}
namespace VMElement{
    export class  VH4Element extends VHTMLElement{
        nodeName="H4";
        align:string
    }
    VAP.decorate(<any>VH4Element,["align"]);
}