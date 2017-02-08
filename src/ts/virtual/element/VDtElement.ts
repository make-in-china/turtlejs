
interface IVNodeMethod{
    (nodeName: "dt", nodeType?: 1): VMDOM.VDtElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VDtElement extends VHtmlElement{
        nodeName:"DT"="DT"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}