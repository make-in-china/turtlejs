/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "legend", nodeType?: 1): VMElement.VLegendElement&IVNodeMethod;
}

namespace VMElement{
    export class  VLegendElement extends VHTMLElement{
        nodeName="LEGEND";
        align:string
    }
    VAP.decorate(<any>VLegendElement,["align"]);
}