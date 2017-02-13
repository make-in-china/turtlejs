
interface VNodeNames{
    "h3":VMDOM.VH3Element
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VH3Element extends VHtmlElement{
        nodeName:"H3"="H3";
        align:string
        
    }
    
}