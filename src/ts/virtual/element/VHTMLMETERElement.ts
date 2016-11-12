/// <reference path="Attribute_Property.ts"/>
class  VHTMLMETERElement extends VHTMLElement{
    value:string
    min:string
    max:string
    low:string
    high:string
    optimum:string
}
VAP.decorate(<any>VHTMLMETERElement,["value","min","max","low","high","optimum"]);