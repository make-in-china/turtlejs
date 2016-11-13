/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "fieldset", nodeType?: 1): VMElement.VFieldsetElement&IVNodeMethod;
}
namespace VMElement{
    export class  VFieldsetElement extends VHtmlElement{
        nodeName="FIELDSET"
        disabled:string
        name:string
    }
    VAP.decorate(<any>VFieldsetElement,["disabled","name"]);
}