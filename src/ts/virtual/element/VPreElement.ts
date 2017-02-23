
interface VNodeNames{
    "pre":VMDOM.VPreElement;
}

namespace VMDOM{
    @mergeClass({width:''})
    export class  VPreElement extends VHTMLElement{
        nodeName:"PRE"="PRE";
        width:string
        
    }
    
}