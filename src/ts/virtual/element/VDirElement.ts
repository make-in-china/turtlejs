/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "dir", nodeType: 1): VDirElement&IVNodeMethod;
}
class  VDirElement extends VHTMLElement{
    compact:string
}
VAP.decorate(<any>VDirElement,["compact"]);