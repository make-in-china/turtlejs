/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "hr", nodeType?: 1): VMDOM.VHrElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({align:'',color:'',noShade:'',size:'',width:''})
    export class VHrElement extends VHtmlElement{
        nodeName="HR";
        align:string
        color:string
        noShade:string
        size:string
        width:string
        
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}