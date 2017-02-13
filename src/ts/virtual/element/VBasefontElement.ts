
interface VNodeNames{
    "basefont":VMDOM.VBasefontElement
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VBasefontElement extends VHtmlElement{
        nodeName:"BASEFONT"="BASEFONT"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
        
    }
    
}