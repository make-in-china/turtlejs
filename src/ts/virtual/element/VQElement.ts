
interface IVNodeMethod{
    (nodeName: "q", nodeType?: 1): VMDOM.VQElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({cite:''})
    export class  VQElement extends VHtmlElement{
        nodeName:"Q"="Q";
        cite:string
        
    }
    
}