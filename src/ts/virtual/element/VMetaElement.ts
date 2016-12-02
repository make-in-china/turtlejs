/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "meta", nodeType?: 1): VMElement.VMetaElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["name","content","scheme"])
    export class  VMetaElement extends VHtmlElement{
        nodeName="META";
        __closeSelf__=true;
        name:string
        content:string
        scheme:string
        
    }
    
}