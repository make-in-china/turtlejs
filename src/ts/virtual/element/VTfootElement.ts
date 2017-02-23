
interface VNodeNames{
    "tfoot":VMDOM.VTfootElement
}

namespace VMDOM{
    @mergeClass({align:'',vAlign:''})
    export class  VTfootElement extends VHTMLElement{
        nodeName:"TFOOT"="TFOOT";
        align:string
        vAlign:string
        
    }
    
}