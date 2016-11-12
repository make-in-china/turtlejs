/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "blockquote", nodeType: 1): VBlockquoteElement&IVNodeMethod;
}
class  VBlockquoteElement extends VElement{
    cite:string
}
VAP.decorate(<any>VBlockquoteElement,["cite"]);