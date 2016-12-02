/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "canvas", nodeType?: 1): VMElement.VCanvasElement&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["width","height"])
    export class  VCanvasElement extends VHtmlElement{
        nodeName="CANVAS";
        width:string
        height:string
        
    }
    
}