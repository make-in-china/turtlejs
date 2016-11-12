/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "dir", nodeType: 1): VDirElement&IVNodeMethod;
}
class  VDirElement extends VElement{
    compact:string
}
VAP.decorate(<any>VDirElement,["compact"]);