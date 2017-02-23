
interface VNodeNames{
    "base": VMDOM.VBaseElement
}
namespace VMDOM{
    @mergeClass({href:'',target:''})
    export class  VBaseElement extends VHTMLElement{
        nodeName:"BASE"="BASE";
        href:string
        target:string
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}