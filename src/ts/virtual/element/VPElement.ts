/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "p", nodeType?: 1): VMElement.VPElement&IVNodeMethod;
}

namespace VMElement{
    export class  VPElement extends VHtmlElement{
        nodeName="P";
        align:string
    }
    VAP.decorate(<any>VPElement,["align"]);
}