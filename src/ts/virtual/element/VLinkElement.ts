/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "link", nodeType?: 1): VMElement.VLinkElement &IVNodeMethod
}

namespace VMElement{
    export class  VLinkElement extends VHtmlElement{
        nodeName="LINK";
        __closeSelf__=true;
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
        cloneNode(deep:boolean=false):VLinkElement &IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["disabled","href","crossOrigin","rel","media","hreflang","type","charset","rev","target","integrity"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VLinkElement &IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VLinkElement,["disabled","href","crossOrigin","rel","media","hreflang","type","charset","rev","target","integrity"]);
}