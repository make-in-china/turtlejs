
interface VNodeNames{
    "pre":VMDOM.VPreElement;
}

namespace VMDOM{
    @mergeClass({width:''})
    export class  VPreElement extends VHtmlElement{
        nodeName:"PRE"="PRE";
        width:string
        
    }
    
}