
interface IVNodeMethod{
    (nodeName: "form", nodeType?: 1): VMDOM.VFormElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({name:'',target:'',title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VFormElement extends VHtmlElement{
        nodeName="FORM"
        name:string
        target:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}