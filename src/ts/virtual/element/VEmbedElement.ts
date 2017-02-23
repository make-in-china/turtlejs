
interface VNodeNames{
    "embed":VMDOM.VEmbedElement
}
namespace VMDOM{
    @mergeClass({type:'',width:'',height:'',align:'',name:'',title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VEmbedElement extends VHTMLElement{
        nodeName:"EMBED"="EMBED"
        type:string
        width:string
        height:string
        align:string
        name:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}