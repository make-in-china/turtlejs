
interface VNodeNames{
    "dl":VMDOM.VDlElement
}
namespace VMDOM{
    @mergeClass({compact:''})
    export class  VDlElement extends VHtmlElement{
        nodeName:"DL"="DL"
        compact:string
        
    }
    
}