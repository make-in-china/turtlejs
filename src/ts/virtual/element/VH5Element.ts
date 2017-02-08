
interface IVNodeMethod{
    (nodeName: "h5", nodeType?: 1): VMDOM.VH5Element&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VH5Element extends VHtmlElement{
        nodeName:"H5"="H5";
        align:string
        
    }
    
}