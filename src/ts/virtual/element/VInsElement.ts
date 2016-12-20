
interface IVNodeMethod{
    (nodeName: "ins", nodeType?: 1): VMDOM.VInsElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({cite:'',dateTime:''})
    export class  VInsElement extends VHtmlElement{
        nodeName="INS";
        cite:string
        dateTime:string
        
    }
    
}