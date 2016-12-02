/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "caption", nodeType?: 1): VMElement.VCaptionElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({align:''})
    export class  VCaptionElement extends VHtmlElement{
        nodeName="CAPTION";
        align:string
        
    }
    
}