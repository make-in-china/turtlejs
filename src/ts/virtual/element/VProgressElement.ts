
interface IVNodeMethod{
    (nodeName: "progress", nodeType?: 1): VMDOM.VProgressElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({value:'',max:''})
    export class  VProgressElement extends VHtmlElement{
        nodeName:"PROGRESS"="PROGRESS";
        value:string
        max:string
        
    }
    
}