/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "ol", nodeType: 1): VOlElement&IVNodeMethod;
}
class  VOlElement extends VHTMLElement{
    reversed:string
    start:string
    type:string
    compact:string
}
VAP.decorate(<any>VOlElement,["reversed","start","type","compact"]);