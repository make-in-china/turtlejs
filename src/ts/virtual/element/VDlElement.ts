/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dl", nodeType?: 1): VMDOM.VDlElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({compact:''})
    export class  VDlElement extends VHtmlElement{
        nodeName="DL"
        compact:string
        
    }
    
}