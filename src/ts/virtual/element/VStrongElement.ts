
interface IVNodeMethod{
    (nodeName: "strong", nodeType?: 1): VMDOM.VStrongElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VStrongElement extends VHtmlElement{
        nodeName="STRONG"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}