
interface IVNodeMethod{
    (nodeName: "tbody", nodeType?: 1): VMDOM.VTbodyElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({align:'',vAlign:''})
    export class  VTbodyElement extends VHtmlElement{
        nodeName="TBODY";
        align:string
        vAlign:string
        
    }
    
}