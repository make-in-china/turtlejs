
interface VNodeNames{
    "xmp":VMDOM.VXmpElement
}

namespace VMDOM{
    @mergeClass({width:''})
    export class  VXmpElement extends VHtmlElement{
        nodeName:"XMP"="XMP";
        width:string
    }
    
}