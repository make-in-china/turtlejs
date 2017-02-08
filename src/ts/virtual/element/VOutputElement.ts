
interface IVNodeMethod{
    (nodeName: "output", nodeType?: 1): VMDOM.VOutputElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({name:''})
    export class  VOutputElement extends VHtmlElement{
        nodeName:"OUTPUT"="OUTPUT";
        name:string
        
    }
    
}