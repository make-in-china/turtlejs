
interface IVNodeMethod{
    (nodeName: "em", nodeType?: 1): VMDOM.VEmElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VEmElement extends VHtmlElement{
        nodeName="EM"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}