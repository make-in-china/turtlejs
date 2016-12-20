
interface IVNodeMethod{
    (nodeName: "label", nodeType?: 1): VMDOM.VLabelElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VLabelElement extends VHtmlElement{
        nodeName="LABEL"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}