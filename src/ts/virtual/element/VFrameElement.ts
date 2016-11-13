/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "frame", nodeType?: 1): VMElement.VFrameElement&IVNodeMethod;
}
namespace VMElement{
    export class VFrameElement extends VHTMLElement{
        nodeName="FRAME"
        __closeSelf__=true;
        name:string
        scrolling:string
        frameBorder:string
        marginHeight:string
        marginWidth:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VFrameElement,["name","scrolling","frameBorder","marginHeight","marginWidth","title","lang","accessKey","webkitdropzone","id"]);
}