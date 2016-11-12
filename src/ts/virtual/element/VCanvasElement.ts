/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "canvas", nodeType: 1): VCanvasElement&IVNodeMethod;
}
class  VCanvasElement extends VHTMLElement{
    width:string
    height:string
}
VAP.decorate(<any>VCanvasElement,["width","height"]);