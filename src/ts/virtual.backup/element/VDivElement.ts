
interface VNodeNames{
    "div": VMDOM.VDivElement
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VDivElement extends VHTMLElement{
        nodeName:"DIV"="DIV"
        align:string
        
    }
    
}