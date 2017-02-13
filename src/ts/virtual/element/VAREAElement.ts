interface VNodeName{
    "area": VMDOM.VAreaElement
}

namespace VMDOM{
    @mergeClass({alt:'',coords:'',shape:'',target:'',ping:'',noHref:'',href:''})
    export class  VAreaElement extends VHtmlElement{
        nodeName:"AREA"="AREA";
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