
interface IVNodeMethod{
    (nodeName: "dialog", nodeType?: 1): VMDOM.VDialogElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({open:''})
    export class  VDialogElement extends VHtmlElement{
        nodeName:"DIALOG"="DIALOG";
        open:string
        
    }
    
}