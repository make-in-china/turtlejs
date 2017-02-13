
interface VNodeNames{
    "col":VMDOM.VColElement
}
namespace VMDOM{
    @mergeClass({span:'',align:'',vAlign:'',width:''})
    export class  VColElement extends VHtmlElement{
        nodeName:"COL"="COL";
        span:string
        align:string
        vAlign:string
        width:string
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
        
    }
    
}