/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "option", nodeType: 1): VOptionElement&IVNodeMethod;
}
class  VOptionElement extends VHTMLElement{
    disabled:string
    label:string
    selected:string
    value:string
}
VAP.decorate(<any>VOptionElement,["disabled","label","selected","value"]);