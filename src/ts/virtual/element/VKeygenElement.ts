/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "keygen", nodeType: 1): VKeygenElement&IVNodeMethod;
}
class  VKeygenElement extends VHTMLElement{
    autofocus:string
    challenge:string
    disabled:string
    keytype:string
    name:string
}
VAP.decorate(<any>VKeygenElement,["autofocus","challenge","disabled","keytype","name"]);