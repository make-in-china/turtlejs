
interface IVNodeMethod{
    (nodeName: "dir", nodeType?: 1): VMDOM.VDirElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({compact:''})
    export class  VDirElement extends VHtmlElement{
        nodeName:"DIR"="DIR"
        compact:string
        
    }
    
}