/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "div", nodeType?: 1): VMElement.VDivElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({align:''})
    export class  VDivElement extends VHtmlElement{
        nodeName="DIV"
        align:string
        
    }
    
}