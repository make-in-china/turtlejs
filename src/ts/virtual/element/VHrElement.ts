/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "hr", nodeType?: 1): VMElement.VHrElement&IVNodeMethod;
}
namespace VMElement{
    export class VHrElement extends VHTMLElement{
        nodeName="HR";
        __closeSelf__=true;
        align:string
        color:string
        noShade:string
        size:string
        width:string
    }
    VAP.decorate(<any>VHrElement,["align","color","noShade","size","width"]);
}