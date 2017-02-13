
interface VNodeNames{
    "source":VMDOM.VSourceElement
}

namespace VMDOM{
    @mergeClass({src:'',type:'',srcset:'',sizes:'',media:''})
    export class  VSourceElement extends VHtmlElement{
        nodeName:"SOURCE"="SOURCE";
        src:string
        type:string
        srcset:string
        sizes:string
        media:string
        
    }
    
}