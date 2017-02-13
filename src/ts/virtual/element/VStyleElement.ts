
interface VNodeNames{
    "style":VMDOM.VStyleElement
}

namespace VMDOM{
    @mergeClass({media:'',type:''})
    export class  VStyleElement extends VHtmlElement{
        nodeName:"STYLE"="STYLE";
        media:string
        type:string
        
    }
    
}