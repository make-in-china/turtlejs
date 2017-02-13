
interface VNodeNames{
    "output":VMDOM.VOutputElement
}

namespace VMDOM{
    @mergeClass({name:''})
    export class  VOutputElement extends VHtmlElement{
        nodeName:"OUTPUT"="OUTPUT";
        name:string
        
    }
    
}