
interface VNodeNames{
    "dir": VMDOM.VDirElement
}
namespace VMDOM{
    @mergeClass({compact:''})
    export class  VDirElement extends VHTMLElement{
        nodeName:"DIR"="DIR"
        compact:string
        
    }
    
}