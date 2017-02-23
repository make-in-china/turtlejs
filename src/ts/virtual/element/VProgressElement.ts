
interface VNodeNames{
    "progress":VMDOM.VProgressElement
}

namespace VMDOM{
    @mergeClass({value:'',max:''})
    export class  VProgressElement extends VHTMLElement{
        nodeName:"PROGRESS"="PROGRESS";
        value:string
        max:string
        
    }
    
}