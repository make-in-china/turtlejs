
interface IVNodeMethod{
    (nodeName: "header", nodeType?: 1): VMDOM.VHeaderElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VHeaderElement extends VHtmlElement{
        nodeName:"HEADER"="HEADER"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}