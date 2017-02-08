
interface IVNodeMethod{
    (nodeName: "frame", nodeType?: 1): VMDOM.VFrameElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({name:'',scrolling:'',frameBorder:'',marginHeight:'',marginWidth:'',title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VFrameElement extends VHtmlElement{
        nodeName:"FRAME"="FRAME"
        name:string
        scrolling:string
        frameBorder:string
        marginHeight:string
        marginWidth:string
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