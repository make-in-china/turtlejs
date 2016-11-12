/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "optgroup", nodeType: 1): VOptgroupElement&IVNodeMethod;
}
class  VOptgroupElement extends VHTMLElement{
    disabled:string
    label:string
}
VAP.decorate(<any>VOptgroupElement,["disabled","label"]);