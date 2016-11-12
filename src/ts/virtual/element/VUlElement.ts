/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "ul", nodeType: 1): VUlElement&IVNodeMethod;
}
class  VUlElement extends VHTMLElement{
    compact:string
    type:string
}
VAP.decorate(<any>VUlElement,["compact","type"]);