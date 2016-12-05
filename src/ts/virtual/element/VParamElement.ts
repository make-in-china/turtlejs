/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "param", nodeType?: 1): VMElement.VParamElement&IVNodeMethod
}

namespace VMElement{
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