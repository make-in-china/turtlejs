/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "col", nodeType?: 1): VMDOM.VColElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({span:'',align:'',vAlign:'',width:''})
    export class  VColElement extends VHtmlElement{
        nodeName="COL";
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