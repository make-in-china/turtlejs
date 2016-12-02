/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "optgroup", nodeType?: 1): VMElement.VOptgroupElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["disabled","label"])
    export class  VOptgroupElement extends VHtmlElement{
        nodeName="OPTGROUP";
        disabled:string
        label:string
        
    }
    
}