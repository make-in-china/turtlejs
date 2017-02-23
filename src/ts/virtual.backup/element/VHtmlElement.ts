
interface VNodeNames{
    html: VMDOM.VHtmlElement
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VHtmlElement extends VHTMLElement{
        nodeType:ENodeType.Element=ENodeType.Element;
        nodeName="HTML"
        // version:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
        constructor(){
            super();
        }
    }
    
}