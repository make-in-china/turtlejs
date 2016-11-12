/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "head", nodeType: 1): VHEADElement&IVNodeMethod;
}
class  VHEADElement extends VElement{
    title:string
    lang:string
    accessKey:string
    webkitdropzone:string
    id:string
}
VAP.decorate(<any>VHEADElement,["title", "lang", "accessKey", "webkitdropzone", "id"]);