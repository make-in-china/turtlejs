
interface IVNodeMethod{
    (nodeName: "legend", nodeType?: 1): VMDOM.VLegendElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({align:''})
    export class  VLegendElement extends VHtmlElement{
        nodeName:"LEGEND"="LEGEND";
        align:string
        
    }
    
}