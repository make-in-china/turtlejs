
interface VNodeNames{
    "param":VMDOM.VParamElement
}

namespace VMDOM{
    @mergeClass({name:'',value:'',type:'',valueType:''})
    export class  VParamElement extends VHTMLElement{
        nodeName:"PARAM"="PARAM";
        name:string
        value:string
        type:string
        valueType:string
        
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}