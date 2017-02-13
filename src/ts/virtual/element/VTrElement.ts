
interface VNodeNames{
    "tr":VMDOM.VTrElement
}

namespace VMDOM{
    @mergeClass({align:'',vAlign:'',bgColor:''})
    export class  VTrElement extends VHtmlElement{
        nodeName:"TR"="TR";
        align:string
        vAlign:string
        bgColor:string
    }
    
}