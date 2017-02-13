
interface VNodeNames{
    "table":VMDOM.VTableElement
}

namespace VMDOM{
    @mergeClass({align:'',border:'',frame:'',rules:'',summary:'',width:'',bgColor:'',cellPadding:'',cellSpacing:''})
    export class  VTableElement extends VHtmlElement{
        nodeName:"TABLE"="TABLE";
        align:string
        border:string
        frame:string
        rules:string
        summary:string
        width:string
        bgColor:string
        cellPadding:string
        cellSpacing:string
        
    }
    
}