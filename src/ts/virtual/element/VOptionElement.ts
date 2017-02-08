
interface IVNodeMethod{
    (nodeName: "option", nodeType?: 1): VMDOM.VOptionElement&IVNodeMethod
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