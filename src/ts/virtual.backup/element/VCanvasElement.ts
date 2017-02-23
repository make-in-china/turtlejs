
interface VNodeNames{
    "canvas":VMDOM.VCanvasElement
}
namespace VMDOM{
    @mergeClass({width:'',height:''})
    export class  VCanvasElement extends VHTMLElement{
        nodeName:"CANVAS"="CANVAS";
        width:string
        height:string
        
    }
    
}