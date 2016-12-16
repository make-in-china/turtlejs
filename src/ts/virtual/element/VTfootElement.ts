/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "tfoot", nodeType?: 1): VMDOM.VTfootElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({align:'',vAlign:''})
    export class  VTfootElement extends VHtmlElement{
        nodeName="TFOOT";
        align:string
        vAlign:string
        
    }
    
}