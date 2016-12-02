/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "thead", nodeType?: 1): VMElement.VTheadElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({align:'',vAlign:''})
    export class  VTheadElement extends VHtmlElement{
        nodeName="THREAD"
        align:string
        vAlign:string
        
    }
    
}