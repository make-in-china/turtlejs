
interface IVNodeMethod{
    (nodeName: "title", nodeType?: 1): VMDOM.VTitleElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VTitleElement extends VHtmlElement{
        nodeName:"TITLE"="TITLE"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    
}