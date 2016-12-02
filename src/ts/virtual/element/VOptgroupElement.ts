/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "optgroup", nodeType?: 1): VMElement.VOptgroupElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({disabled:'',label:''})
    export class  VOptgroupElement extends VHtmlElement{
        nodeName="OPTGROUP";
        disabled:string
        label:string
        
    }
    
}