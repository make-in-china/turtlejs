
interface IVNodeMethod{
    (nodeName: "thead", nodeType?: 1): VMDOM.VTheadElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({align:'',vAlign:''})
    export class  VTheadElement extends VHtmlElement{
        nodeName:"THREAD"="THREAD"
        align:string
        vAlign:string
        
    }
    
}