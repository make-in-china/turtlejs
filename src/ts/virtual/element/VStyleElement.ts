
interface IVNodeMethod{
    (nodeName: "style", nodeType?: 1): VMDOM.VStyleElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({media:'',type:''})
    export class  VStyleElement extends VHtmlElement{
        nodeName:"STYLE"="STYLE";
        media:string
        type:string
        
    }
    
}