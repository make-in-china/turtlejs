
interface VNodeNames{
    "keygen":VMDOM.VKeygenElement
}

namespace VMDOM{
    @mergeClass({autofocus:'',challenge:'',disabled:'',keytype:'',name:''})
    export class  VKeygenElement extends VHTMLElement{
        nodeName:"KEYGEN"="KEYGEN";
        autofocus:string
        challenge:string
        disabled:string
        keytype:string
        name:string
        
    }
    
}