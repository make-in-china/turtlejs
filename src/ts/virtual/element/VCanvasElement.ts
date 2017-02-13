
interface VNodeNames{
    "canvas":VMDOM.VCanvasElement
}
namespace VMDOM{
    @mergeClass({width:'',height:''})
    export class  VCanvasElement extends VHtmlElement{
        nodeName:"CANVAS"="CANVAS";
        width:string
        height:string
        
    }
    
}