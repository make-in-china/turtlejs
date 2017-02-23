
interface VNodeNames{
    "dialog":VMDOM.VDialogElement
}
namespace VMDOM{
    @mergeClass({open:''})
    export class  VDialogElement extends VHTMLElement{
        nodeName:"DIALOG"="DIALOG";
        open:string
        
    }
    
}