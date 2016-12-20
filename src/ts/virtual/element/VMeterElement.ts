
interface IVNodeMethod{
    (nodeName: "meter", nodeType?: 1): VMDOM.VMeterElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({value:'',min:'',max:'',low:'',high:'',optimum:''})
    export class  VMeterElement extends VHtmlElement{
        nodeName="METER";
        value:string
        min:string
        max:string
        low:string
        high:string
        optimum:string
        
    }
    
}