
interface IVNodeMethod{
    (nodeName: "video", nodeType?: 1): VMDOM.VVideoElement&IVNodeMethod
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