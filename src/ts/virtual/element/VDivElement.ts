
interface VNodeNames{
    "div": VMDOM.VDivElement
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VDivElement extends VHtmlElement{
        nodeName:"DIV"="DIV"
        align:string
        
    }
    
}