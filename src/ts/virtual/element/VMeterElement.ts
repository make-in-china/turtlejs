
interface VNodeNames{
    "meter":VMDOM.VMeterElement
}

namespace VMDOM{
    @mergeClass({value:'',min:'',max:'',low:'',high:'',optimum:''})
    export class  VMeterElement extends VHTMLElement{
        nodeName:"METER"="METER";
        value:string
        min:string
        max:string
        low:string
        high:string
        optimum:string
        
    }
    
}