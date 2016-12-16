/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "div", nodeType?: 1): VMDOM.VDivElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VDivElement extends VHtmlElement{
        nodeName="DIV"
        align:string
        
    }
    
}