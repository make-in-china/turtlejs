
interface VNodeNames{
    "li":VMDOM.VLiElement
}

namespace VMDOM{
    @mergeClass({value:'',type:''})
    export class  VLiElement extends VHTMLElement{
        nodeName:"LI"="LI";
        value:string
        type:string
        
    }
    
}