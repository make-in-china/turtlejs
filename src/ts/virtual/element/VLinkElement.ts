/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "link", nodeType?: 1): VMElement.VLinkElement &IVNodeMethod
}

namespace VMElement{
    @mergeClass({disabled:'',href:'',crossOrigin:'',rel:'',media:'',hreflang:'',type:'',charset:'',rev:'',target:'',integrity:''})
    export class  VLinkElement extends VHtmlElement{
        nodeName="LINK";
        disabled:string
        href:string
        crossOrigin:string
        rel:string
        media:string
        hreflang:string
        type:string
        charset:string
        rev:string
        target:string
        integrity:string
        
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}