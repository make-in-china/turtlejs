
interface VNodeNames{
    "dir": VMDOM.VDirElement
}
namespace VMDOM{
    @mergeClass({compact:''})
    export class  VDirElement extends VHtmlElement{
        nodeName:"DIR"="DIR"
        compact:string
        
    }
    
}