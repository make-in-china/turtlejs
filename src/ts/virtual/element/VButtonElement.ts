
interface VNodeNames{
    "button":VMDOM.VButtonElement
}
namespace VMDOM{
    @mergeClass({formTarget:'',name:'',value:'',title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VButtonElement extends VHTMLElement{
        nodeName:"BUTTON"="BUTTON"
        formTarget:string
        name:string
        value:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}