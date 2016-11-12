/// <reference path="Attribute_Property.ts"/>
class  VHTMLPARAMElement extends VHTMLElement{
    name:string
    value:string
    type:string
    valueType:string
}
VAP.decorate(<any>VHTMLPARAMElement,["name","value","type","valueType"]);