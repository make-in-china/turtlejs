/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "ins", nodeType?: 1): VMElement.VInsElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({cite:'',dateTime:''})
    export class  VInsElement extends VHtmlElement{
        nodeName="INS";
        cite:string
        dateTime:string
        
    }
    
}