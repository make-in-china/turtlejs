
interface VNodeNames{
    "h5":VMDOM.VH5Element
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VH5Element extends VHTMLElement{
        nodeName:"H5"="H5";
        align:string
        
    }
    
}