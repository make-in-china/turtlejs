
interface IVNodeMethod{
    (nodeName: "p", nodeType?: 1): VMDOM.VPElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({align:''})
    export class  VPElement extends VHtmlElement{
        nodeName="P";
        align:string
        
    }
    
}