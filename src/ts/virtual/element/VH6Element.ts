
interface IVNodeMethod{
    (nodeName: "h6", nodeType?: 1): VMDOM.VH6Element&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VH6Element extends VHtmlElement{
        nodeName:"H6"="H6";
        align:string
        
    }
    
}