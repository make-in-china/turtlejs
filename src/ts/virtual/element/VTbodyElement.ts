
interface VNodeNames{
    "tbody":VMDOM.VTbodyElement
}

namespace VMDOM{
    @mergeClass({align:'',vAlign:''})
    export class  VTbodyElement extends VHtmlElement{
        nodeName:"TBODY"="TBODY";
        align:string
        vAlign:string
        
    }
    
}