
interface IVNodeMethod{
    (nodeName: "dd", nodeType?: 1): VMDOM.VDdElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VDdElement extends VHtmlElement{
        nodeName="DD"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}