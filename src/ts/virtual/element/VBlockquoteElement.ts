
interface VNodeNames{
    "blockquote":VMDOM.VBlockquoteElement
}
namespace VMDOM{
    @mergeClass({cite:''})
    export class  VBlockquoteElement extends VHTMLElement{
        nodeName:"BLOCKQUOTE"="BLOCKQUOTE";
        cite:string
        
    }
    
}