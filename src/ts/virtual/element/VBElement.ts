
interface IVNodeMethod{
    (nodeName: "b", nodeType?: 1): VMDOM.VBElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VBElement extends VHtmlElement{
        nodeName:"B"="B"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}