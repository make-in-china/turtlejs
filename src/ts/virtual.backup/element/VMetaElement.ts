
interface VNodeNames{
    "meta":VMDOM.VMetaElement
}

namespace VMDOM{
    @mergeClass({name:'',content:'',scheme:''})
    export class  VMetaElement extends VHTMLElement{
        nodeName:"META"="META";
        name:string
        content:string
        scheme:string
        
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}