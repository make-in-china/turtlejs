/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h6", nodeType?: 1): VMElement.VH6Element&IVNodeMethod
}
namespace VMElement{
    @mergeClass({align:''})
    export class  VH6Element extends VHtmlElement{
        nodeName="H6";
        align:string
        
    }
    
}