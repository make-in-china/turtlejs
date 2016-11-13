/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "ul", nodeType?: 1): VMElement.VUlElement&IVNodeMethod;
}

namespace VMElement{
    export class  VUlElement extends VHtmlElement{
        nodeName="UL";
        compact:string
        type:string
    }
    VAP.decorate(<any>VUlElement,["compact","type"]);
}