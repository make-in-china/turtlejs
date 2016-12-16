/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h4", nodeType?: 1): VMDOM.VH4Element&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VH4Element extends VHtmlElement{
        nodeName="H4";
        align:string
        
    }
    
}