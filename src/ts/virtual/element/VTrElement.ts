
interface IVNodeMethod{
    (nodeName: "tr", nodeType?: 1): VMDOM.VTrElement&IVNodeMethod
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