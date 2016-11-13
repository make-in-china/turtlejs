/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h1", nodeType?: 1): VMElement.VH1Element&IVNodeMethod;
}
namespace VMElement{
    export class  VH1Element extends VHTMLElement{
        nodeName="H1";
        align:string
    }
    VAP.decorate(<any>VH1Element,["align"]);
}