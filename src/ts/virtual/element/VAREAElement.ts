/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "area", nodeType?: 1): VMElement.VAreaElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({alt:'',coords:'',shape:'',target:'',ping:'',noHref:'',href:''})
    export class  VAreaElement extends VHtmlElement{
        nodeName="AREA";
        __closeSelf__=true;
        alt:string
        coords:string
        shape:string
        target:string
        ping:string
        noHref:string
        href:string
    }
    
}