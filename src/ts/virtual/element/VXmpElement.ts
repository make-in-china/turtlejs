/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "xmp", nodeType?: 1): VMElement.VXmpElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({width:''})
    export class  VXmpElement extends VHtmlElement{
        nodeName="XMP";
        width:string
    }
    
}