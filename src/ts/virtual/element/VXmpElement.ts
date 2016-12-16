/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "xmp", nodeType?: 1): VMDOM.VXmpElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({width:''})
    export class  VXmpElement extends VHtmlElement{
        nodeName="XMP";
        width:string
    }
    
}