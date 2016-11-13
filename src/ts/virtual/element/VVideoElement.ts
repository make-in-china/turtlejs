/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "video", nodeType?: 1): VMElement.VVideoElement&IVNodeMethod;
}

namespace VMElement{
    export class  VVideoElement extends VHtmlElement{
        nodeName="VIDEO";
        width:string
        height:string
        poster:string
    }
    VAP.decorate(<any>VVideoElement,["width","height","poster"]);
}