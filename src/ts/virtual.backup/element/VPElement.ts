
interface VNodeNames{
    "p":VMDOM.VPElement
}

namespace VMDOM{
    @mergeClass({align:''})
    export class  VPElement extends VHTMLElement{
        nodeName:"P"="P";
        align:string
        
    }
    
}