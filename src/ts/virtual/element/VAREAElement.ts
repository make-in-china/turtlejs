
interface IVNodeMethod{
    (nodeName: "area", nodeType?: 1): VMDOM.VAreaElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({alt:'',coords:'',shape:'',target:'',ping:'',noHref:'',href:''})
    export class  VAreaElement extends VHtmlElement{
        nodeName="AREA";
        alt:string
        coords:string
        shape:string
        target:string
        ping:string
        noHref:string
        href:string
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}