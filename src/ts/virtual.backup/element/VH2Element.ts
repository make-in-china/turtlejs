
interface VNodeNames{
    "h2":VMDOM.VH2Element
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VH2Element extends VHTMLElement{
        nodeName:"H2"="H2";
        align:string
        
    }
    
}