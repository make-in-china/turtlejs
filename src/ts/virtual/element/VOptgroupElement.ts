/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "optgroup", nodeType?: 1): VMElement.VOptgroupElement&IVNodeMethod;
}

namespace VMElement{
    export class  VOptgroupElement extends VHTMLElement{
        nodeName="OPTGROUP";
        disabled:string
        label:string
    }
    VAP.decorate(<any>VOptgroupElement,["disabled","label"]);
}