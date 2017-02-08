
interface IVNodeMethod{
    (nodeName: "xmp", nodeType?: 1): VMDOM.VXmpElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({width:''})
    export class  VXmpElement extends VHtmlElement{
        nodeName:"XMP"="XMP";
        width:string
    }
    
}