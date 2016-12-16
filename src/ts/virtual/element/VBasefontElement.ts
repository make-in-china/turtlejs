/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "basefont", nodeType?: 1): VMDOM.VBasefontElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VBasefontElement extends VHtmlElement{
        nodeName="BASEFONT"
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