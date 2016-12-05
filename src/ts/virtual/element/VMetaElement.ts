/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "meta", nodeType?: 1): VMElement.VMetaElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({name:'',content:'',scheme:''})
    export class  VMetaElement extends VHtmlElement{
        nodeName="META";
        name:string
        content:string
        scheme:string
        
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}