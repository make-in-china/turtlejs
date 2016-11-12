/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "meter", nodeType: 1): VMeterElement&IVNodeMethod;
}
class  VMeterElement extends VHTMLElement{
    value:string
    min:string
    max:string
    low:string
    high:string
    optimum:string
}
VAP.decorate(<any>VMeterElement,["value","min","max","low","high","optimum"]);