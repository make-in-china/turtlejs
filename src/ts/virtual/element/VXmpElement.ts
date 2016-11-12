/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "xmp", nodeType: 1): VXmpElement&IVNodeMethod;
}
class  VXmpElement extends VElement{
    width:string
}
VAP.decorate(<any>VXmpElement,["width"]);