/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "video", nodeType: 1): VVideoElement&IVNodeMethod;
}
class  VVideoElement extends VElement{
    width:string
    height:string
    poster:string
}
VAP.decorate(<any>VVideoElement,["width","height","poster"]);