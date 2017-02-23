
interface VNodeNames{
    "legend":VMDOM.VLegendElement
}

namespace VMDOM{
    @mergeClass({align:''})
    export class  VLegendElement extends VHTMLElement{
        nodeName:"LEGEND"="LEGEND";
        align:string
        
    }
    
}