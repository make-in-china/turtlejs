
interface VNodeNames{
    "hr":VMDOM.VHrElement
}
namespace VMDOM{
    @mergeClass({align:'',color:'',noShade:'',size:'',width:''})
    export class VHrElement extends VHtmlElement{
        nodeName:"HR"="HR";
        align:string
        color:string
        noShade:string
        size:string
        width:string
        
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}