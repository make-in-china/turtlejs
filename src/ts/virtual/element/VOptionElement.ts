
interface VNodeNames{
    "option":VMDOM.VOptionElement
}

namespace VMDOM{
    @mergeClass({disabled:'',label:'',selected:'',value:''})
    export class  VOptionElement extends VHtmlElement{
        nodeName:"OPTION"="OPTION";
        disabled:string
        label:string
        selected:string
        value:string
        
    }
    
}