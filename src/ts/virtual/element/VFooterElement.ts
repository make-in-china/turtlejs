
interface IVNodeMethod{
    (nodeName: "footer", nodeType?: 1): VMDOM.VFooterElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VFooterElement extends VHtmlElement{
        nodeName:"FOOTER"="FOOTER"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}