
interface IVNodeMethod{
    (nodeName: "svg", nodeType?: 1): VMDOM.VSvgElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VSvgElement extends VHtmlElement{
        nodeName="SVG"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}