
interface IVNodeMethod{
    (nodeName: "img", nodeType?: 1): VMDOM.VImgElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({alt:'',src:'',srcset:'',sizes:'',crossOrigin:'',useMap:'',isMap:'',width:'',height:'',name:'',lowsrc:'',align:'',hspace:'',vspace:'',longDesc:'',border:''})
    export class  VImgElement extends VHtmlElement{
        nodeName="IMG";
        alt:string
        src:string
        srcset:string
        sizes:string
        crossOrigin:string
        useMap:string
        isMap:string
        width:string
        height:string
        name:string
        lowsrc:string
        align:string
        hspace:string
        vspace:string
        longDesc:string
        border:string
        
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}