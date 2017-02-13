
interface VNodeNames{
    "body":VMDOM.VBodyElement
}
namespace VMDOM{
    @mergeClass({text:'',link:'',vLink:'',aLink:'',bgColor:'',background:''})
    export class  VBodyElement extends VHtmlElement{
        nodeName:"BODY"="BODY";
        text:string
        link:string
        vLink:string
        aLink:string
        bgColor:string
        background:string
        
    }
    
}