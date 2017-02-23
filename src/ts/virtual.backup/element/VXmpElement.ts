
interface VNodeNames{
    "xmp":VMDOM.VXmpElement
}

namespace VMDOM{
    @mergeClass({width:''})
    export class  VXmpElement extends VHTMLElement{
        nodeName:"XMP"="XMP";
        width:string
    }
    
}