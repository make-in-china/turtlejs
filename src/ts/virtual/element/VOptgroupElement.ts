
interface VNodeNames{
    "optgroup":VMDOM.VOptgroupElement
}

namespace VMDOM{
    @mergeClass({disabled:'',label:''})
    export class  VOptgroupElement extends VHTMLElement{
        nodeName:"OPTGROUP"="OPTGROUP";
        disabled:string
        label:string
        
    }
    
}