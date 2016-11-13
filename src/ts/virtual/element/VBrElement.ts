/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "br", nodeType?: 1): VMElement.VBrElement&IVNodeMethod;
}
namespace VMElement{
    export class  VBrElement extends VHTMLElement{
        nodeName="BR";
        __closeSelf__=true;
        clear:string;
    }
    VAP.decorate(<any>VBrElement,["clear"]);
}