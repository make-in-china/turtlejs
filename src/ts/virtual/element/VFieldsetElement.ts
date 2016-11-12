/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "fieldset", nodeType: 1): VFieldsetElement&IVNodeMethod;
}
class  VFieldsetElement extends VElement{
    disabled:string
    name:string
}
VAP.decorate(<any>VFieldsetElement,["disabled","name"]);