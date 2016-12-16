/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "meta", nodeType?: 1): VMDOM.VMetaElement&IVNodeMethod
}

namespace VMDOM{
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