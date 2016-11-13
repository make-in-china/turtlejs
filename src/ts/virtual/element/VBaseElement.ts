/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "base", nodeType?: 1): VMElement.VBaseElement&IVNodeMethod;
}
namespace VMElement{
    export class  VBaseElement extends VHTMLElement{
        nodeName="BASE";
        __closeSelf__=true;
        href:string
        target:string
    }
    VAP.decorate(<any>VBaseElement,["href","target"]);
}