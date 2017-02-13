
interface VNodeNames{
    "progress":VMDOM.VProgressElement
}

namespace VMDOM{
    @mergeClass({value:'',max:''})
    export class  VProgressElement extends VHtmlElement{
        nodeName:"PROGRESS"="PROGRESS";
        value:string
        max:string
        
    }
    
}