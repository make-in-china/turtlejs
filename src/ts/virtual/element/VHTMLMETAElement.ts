/// <reference path="Attribute_Property.ts"/>
class  VHTMLMETAElement extends VHTMLElement{
    name:string
    content:string
    scheme:string
}
VAP.decorate(<any>VHTMLMETAElement,["name","content","scheme"]);