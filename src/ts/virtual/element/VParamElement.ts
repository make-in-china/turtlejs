
interface IVNodeMethod{
    (nodeName: "param", nodeType?: 1): VMDOM.VParamElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({name:'',value:'',type:'',valueType:''})
    export class  VParamElement extends VHtmlElement{
        nodeName="PARAM";
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