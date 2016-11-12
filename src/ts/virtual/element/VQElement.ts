/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "q", nodeType: 1): VQElement&IVNodeMethod;
}
class  VQElement extends VHTMLElement{
    cite:string
}
VAP.decorate(<any>VQElement,["cite"]);