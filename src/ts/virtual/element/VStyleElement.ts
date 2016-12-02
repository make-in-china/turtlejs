/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "style", nodeType?: 1): VMElement.VStyleElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["media","type"])
    export class  VStyleElement extends VHtmlElement{
        nodeName="STYLE";
        media:string
        type:string
        
    }
    
}