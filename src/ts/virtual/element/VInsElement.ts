
interface VNodeNames{
    "ins":VMDOM.VInsElement
}

namespace VMDOM{
    @mergeClass({cite:'',dateTime:''})
    export class  VInsElement extends VHtmlElement{
        nodeName:"INS"="INS";
        cite:string
        dateTime:string
        
    }
    
}