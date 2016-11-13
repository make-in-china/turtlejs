/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h5", nodeType?: 1): VMElement.VH5Element&IVNodeMethod;
}
namespace VMElement{
    export class  VH5Element extends VHTMLElement{
        nodeName="H5";
        align:string
    }
    VAP.decorate(<any>VH5Element,["align"]);
}