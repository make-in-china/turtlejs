
interface VNodeNames{
    "video":VMDOM.VVideoElement
}

namespace VMDOM{
    @mergeClass({width:'',height:'',poster:''})
    export class  VVideoElement extends VHtmlElement{
        nodeName:"VIDEO"="VIDEO";
        width:string
        height:string
        poster:string
    }
    
}