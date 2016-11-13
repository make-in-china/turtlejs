/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "canvas", nodeType?: 1): VMElement.VCanvasElement&IVNodeMethod;
}
namespace VMElement{
    export class  VCanvasElement extends VHTMLElement{
        nodeName="CANVAS";
        width:string
        height:string
    }
    VAP.decorate(<any>VCanvasElement,["width","height"]);
}