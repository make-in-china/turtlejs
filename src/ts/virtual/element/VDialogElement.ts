
interface VNodeNames{
    "dialog":VMDOM.VDialogElement
}
namespace VMDOM{
    @mergeClass({open:''})
    export class  VDialogElement extends VHtmlElement{
        nodeName:"DIALOG"="DIALOG";
        open:string
        
    }
    
}