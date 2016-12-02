/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "video", nodeType?: 1): VMElement.VVideoElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["width","height","poster"])
    export class  VVideoElement extends VHtmlElement{
        nodeName="VIDEO";
        width:string
        height:string
        poster:string
    }
    
}