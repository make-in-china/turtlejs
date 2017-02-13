
interface VNodeNames{
    "legend":VMDOM.VLegendElement
}

namespace VMDOM{
    @mergeClass({align:''})
    export class  VLegendElement extends VHtmlElement{
        nodeName:"LEGEND"="LEGEND";
        align:string
        
    }
    
}