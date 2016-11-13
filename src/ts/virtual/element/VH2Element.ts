/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h2", nodeType?: 1): VMElement.VH2Element&IVNodeMethod;
}
namespace VMElement{
    export class  VH2Element extends VHTMLElement{
        nodeName="H2";
        align:string
    }
    VAP.decorate(<any>VH2Element,["align"]);
}