/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "option", nodeType?: 1): VMElement.VOptionElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({disabled:'',label:'',selected:'',value:''})
    export class  VOptionElement extends VHtmlElement{
        nodeName="OPTION";
        disabled:string
        label:string
        selected:string
        value:string
        
    }
    
}