
interface IVNodeMethod{
    (nodeName: "h3", nodeType?: 1): VMDOM.VH3Element&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VH3Element extends VHtmlElement{
        nodeName:"H3"="H3";
        align:string
        
    }
    
}