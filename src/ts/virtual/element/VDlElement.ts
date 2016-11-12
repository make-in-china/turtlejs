/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "dl", nodeType: 1): VDlElement&IVNodeMethod;
}
class  VDlElement extends VHTMLElement{
    compact:string
}
VAP.decorate(<any>VDlElement,["compact"]);