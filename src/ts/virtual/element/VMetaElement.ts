/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "meta", nodeType?: 1): VMElement.VMetaElement&IVNodeMethod;
}

namespace VMElement{
    export class  VMetaElement extends VHTMLElement{
        nodeName="META";
        __closeSelf__=true;
        name:string
        content:string
        scheme:string
    }
    VAP.decorate(<any>VMetaElement,["name","content","scheme"]);
}