
interface VNodeNames{
    "ins":VMDOM.VInsElement
}

namespace VMDOM{
    @mergeClass({cite:'',dateTime:''})
    export class  VInsElement extends VHTMLElement{
        nodeName:"INS"="INS";
        cite:string
        dateTime:string
        
    }
    
}