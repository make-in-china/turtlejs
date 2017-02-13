
interface VNodeNames{
    "li":VMDOM.VLiElement
}

namespace VMDOM{
    @mergeClass({value:'',type:''})
    export class  VLiElement extends VHtmlElement{
        nodeName:"LI"="LI";
        value:string
        type:string
        
    }
    
}