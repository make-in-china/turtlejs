
interface VNodeNames{
    "dl":VMDOM.VDlElement
}
namespace VMDOM{
    @mergeClass({compact:''})
    export class  VDlElement extends VHTMLElement{
        nodeName:"DL"="DL"
        compact:string
        
    }
    
}