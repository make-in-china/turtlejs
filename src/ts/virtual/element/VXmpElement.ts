/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "xmp", nodeType?: 1): VMElement.VXmpElement&IVNodeMethod;
}

namespace VMElement{
    export class  VXmpElement extends VHTMLElement{
        nodeName="XMP";
        width:string
    }
    VAP.decorate(<any>VXmpElement,["width"]);
}