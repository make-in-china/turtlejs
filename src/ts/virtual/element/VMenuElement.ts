/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "menu", nodeType: 1): VMenuElement&IVNodeMethod;
}
class  VMenuElement extends VHTMLElement{
    compact:string
}
VAP.decorate(<any>VMenuElement,["compact"]);