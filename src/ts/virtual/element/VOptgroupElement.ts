
interface IVNodeMethod{
    (nodeName: "optgroup", nodeType?: 1): VMDOM.VOptgroupElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({disabled:'',label:''})
    export class  VOptgroupElement extends VHtmlElement{
        nodeName="OPTGROUP";
        disabled:string
        label:string
        
    }
    
}