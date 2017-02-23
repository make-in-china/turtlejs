
interface VNodeNames{
    "iframe":VMDOM.VIframeElement
}

namespace VMDOM{
    @mergeClass({src:'',srcdoc:'',name:'',sandbox:'',allowFullscreen:'',width:'',height:'',align:'',scrolling:'',frameBorder:'',longDesc:'',marginHeight:'',marginWidth:''})
    export class  VIframeElement extends VHTMLElement{
        nodeName:"IFRAME"="IFRAME";
        src:string
        srcdoc:string
        name:string
        sandbox:string
        allowFullscreen:string
        width:string
        height:string
        align:string
        scrolling:string
        frameBorder:string
        longDesc:string
        marginHeight:string
        marginWidth:string
        
    }
    
}