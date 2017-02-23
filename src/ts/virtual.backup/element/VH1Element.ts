
interface VNodeNames{
    "h1":VMDOM.VH1Element
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VH1Element extends VHTMLElement{
        nodeName:"H1"="H1";
        align:string
        
    }
    
}