/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h3", nodeType?: 1): VMElement.VH3Element&IVNodeMethod;
}
namespace VMElement{
    export class  VH3Element extends VHTMLElement{
        nodeName="H3";
        align:string
    }
    VAP.decorate(<any>VH3Element,["align"]);
}