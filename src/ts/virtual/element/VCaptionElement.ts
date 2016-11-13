/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "caption", nodeType?: 1): VMElement.VCaptionElement&IVNodeMethod;
}
namespace VMElement{
    export class  VCaptionElement extends VHTMLElement{
        nodeName="CAPTION";
        align:string
    }
    VAP.decorate(<any>VCaptionElement,["align"]);
}