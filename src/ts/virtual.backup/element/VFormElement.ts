
interface VNodeNames{
    "form":VMDOM.VFormElement
}
namespace VMDOM{
    @mergeClass({name:'',target:'',title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VFormElement extends VHTMLElement{
        nodeName:"FORM"="FORM"
        name:string
        target:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}