
interface VNodeNames{
    "head":VMDOM.VHeadElement
}
namespace VMDOM{
    @mergeClass({title:'', lang:'', accessKey:'', webkitdropzone:'', id:''})
    export class  VHeadElement extends VHtmlElement{
        nodeName:"HEAD"="HEAD";
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    
}