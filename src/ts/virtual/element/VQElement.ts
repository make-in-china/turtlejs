
interface VNodeNames{
    "q":VMDOM.VQElement
}

namespace VMDOM{
    @mergeClass({cite:''})
    export class  VQElement extends VHtmlElement{
        nodeName:"Q"="Q";
        cite:string
        
    }
    
}