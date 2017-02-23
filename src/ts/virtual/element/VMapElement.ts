
interface VNodeNames{
    "map":VMDOM.VMapElement
}

namespace VMDOM{
    @mergeClass({name:''})
    export class  VMapElement extends VHTMLElement{
        nodeName:"MAP"="MAP";
        name:string
        
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}