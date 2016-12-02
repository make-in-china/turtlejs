/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dl", nodeType?: 1): VMElement.VDlElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({compact:''})
    export class  VDlElement extends VHtmlElement{
        nodeName="DL"
        compact:string
        
    }
    
}