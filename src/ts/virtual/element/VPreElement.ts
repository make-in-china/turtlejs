/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "pre", nodeType?: 1): VMDOM.VPreElement&IVNodeMethod;
}

namespace VMDOM{
    @mergeClass({width:''})
    export class  VPreElement extends VHtmlElement{
        nodeName="PRE";
        width:string
        
    }
    
}