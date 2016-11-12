/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "meta", nodeType: 1): VMetaElement&IVNodeMethod;
}
class  VMetaElement extends VHTMLElement{
    name:string
    content:string
    scheme:string
}
VAP.decorate(<any>VMetaElement,["name","content","scheme"]);