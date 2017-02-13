
interface VNodeNames{
    "colgroup":VMDOM.VColgroupElement
}
namespace VMDOM{
    @mergeClass({span:'',align:'',vAlign:'',width:''})
    export class  VColgroupElement extends VHtmlElement{
        nodeName:"COLGROUP"="COLGROUP";
        span:string
        align:string
        vAlign:string
        width:string
        
    }
    
}