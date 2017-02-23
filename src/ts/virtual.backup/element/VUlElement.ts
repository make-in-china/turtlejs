
interface VNodeNames{
    "ul":VMDOM.VUlElement
}

namespace VMDOM{
    @mergeClass({compact:'',type:''})
    export class  VUlElement extends VHTMLElement{
        nodeName:"UL"="UL";
        compact:string
        type:string
    }
    
}