/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "track", nodeType?: 1): VMElement.VTrackElement&IVNodeMethod;
}

namespace VMElement{
    export class  VTrackElement extends VHTMLElement{
        nodeName="TRACK";
        kind:string
        src:string
        srclang:string
        label:string
        default:string
    }
    VAP.decorate(<any>VTrackElement,["kind","src","srclang","label","default"]);
}