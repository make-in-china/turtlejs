
interface IVNodeMethod{
    (nodeName: "span", nodeType?: 1): VMDOM.VSpanElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VSpanElement extends VHtmlElement{
        nodeName="SPAN"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}