/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "source", nodeType: 1): VSourceElement&IVNodeMethod;
}
class  VSourceElement extends VElement{
    src:string
    type:string
    srcset:string
    sizes:string
    media:string
}
VAP.decorate(<any>VSourceElement,["src","type","srcset","sizes","media"]);