
interface VNodeNames{
    "q":VMDOM.VQElement
}

namespace VMDOM{
    @mergeClass({cite:''})
    export class  VQElement extends VHTMLElement{
        nodeName:"Q"="Q";
        cite:string
        
    }
    
}