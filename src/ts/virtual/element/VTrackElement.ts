
interface VNodeNames{
    "track":VMDOM.VTrackElement
}

namespace VMDOM{
    @mergeClass({kind:'',src:'',srclang:'',label:'',default:''})
    export class  VTrackElement extends VHtmlElement{
        nodeName:"TRACK"="TRACK";
        kind:string
        src:string
        srclang:string
        label:string
        default:string
    }
    
}