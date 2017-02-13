
interface VNodeNames{
    "ul":VMDOM.VUlElement
}

namespace VMDOM{
    @mergeClass({compact:'',type:''})
    export class  VUlElement extends VHtmlElement{
        nodeName:"UL"="UL";
        compact:string
        type:string
    }
    
}