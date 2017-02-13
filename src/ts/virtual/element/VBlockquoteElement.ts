
interface VNodeNames{
    "blockquote":VMDOM.VBlockquoteElement
}
namespace VMDOM{
    @mergeClass({cite:''})
    export class  VBlockquoteElement extends VHtmlElement{
        nodeName:"BLOCKQUOTE"="BLOCKQUOTE";
        cite:string
        
    }
    
}