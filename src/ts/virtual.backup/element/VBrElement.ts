
interface VNodeNames{
    "br":VMDOM.VBrElement
}
namespace VMDOM{
    @mergeClass({clear:''})
    export class  VBrElement extends VHTMLElement{
        nodeName:"BR"="BR";
        clear:string;
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}