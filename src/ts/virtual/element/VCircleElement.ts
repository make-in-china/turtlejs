
interface IVNodeMethod{
    (nodeName: "circle", nodeType?: 1): VMDOM.VCircleElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VCircleElement extends VHtmlElement{
        nodeName:"CIRCLE"="CIRCLE"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}