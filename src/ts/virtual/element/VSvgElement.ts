
interface VNodeNames{
    "svg":VMDOM.VSvgElement
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VSvgElement extends VHtmlElement{
        nodeName:"SVG"="SVG"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}