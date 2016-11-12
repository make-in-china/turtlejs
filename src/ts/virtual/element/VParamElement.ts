/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "param", nodeType: 1): VParamElement&IVNodeMethod;
}
class  VParamElement extends VHTMLElement{
    name:string
    value:string
    type:string
    valueType:string
}
VAP.decorate(<any>VParamElement,["name","value","type","valueType"]);