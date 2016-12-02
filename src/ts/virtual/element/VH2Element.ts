/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h2", nodeType?: 1): VMElement.VH2Element&IVNodeMethod
}
namespace VMElement{
    @mergeClass({align:''})
    export class  VH2Element extends VHtmlElement{
        nodeName="H2";
        align:string
        
    }
    
}