
interface VNodeNames{
    "output":VMDOM.VOutputElement
}

namespace VMDOM{
    @mergeClass({name:''})
    export class  VOutputElement extends VHTMLElement{
        nodeName:"OUTPUT"="OUTPUT";
        name:string
        
    }
    
}