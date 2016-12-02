/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "progress", nodeType?: 1): VMElement.VProgressElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({value:'',max:''})
    export class  VProgressElement extends VHtmlElement{
        nodeName="PROGRESS";
        value:string
        max:string
        
    }
    
}