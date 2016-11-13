/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "source", nodeType?: 1): VMElement.VSourceElement&IVNodeMethod;
}

namespace VMElement{
    export class  VSourceElement extends VHtmlElement{
        nodeName="SOURCE";
        src:string
        type:string
        srcset:string
        sizes:string
        media:string
    }
    VAP.decorate(<any>VSourceElement,["src","type","srcset","sizes","media"]);
}