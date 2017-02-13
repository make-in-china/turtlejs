
interface VNodeNames{
    "p":VMDOM.VPElement
}

namespace VMDOM{
    @mergeClass({align:''})
    export class  VPElement extends VHtmlElement{
        nodeName:"P"="P";
        align:string
        
    }
    
}