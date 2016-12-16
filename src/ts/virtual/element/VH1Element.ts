/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h1", nodeType?: 1): VMDOM.VH1Element&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VH1Element extends VHtmlElement{
        nodeName="H1";
        align:string
        
    }
    
}