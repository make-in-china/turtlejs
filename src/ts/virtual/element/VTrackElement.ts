/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "track", nodeType: 1): VTrackElement&IVNodeMethod;
}
class  VTrackElement extends VHTMLElement{
    kind:string
    src:string
    srclang:string
    label:string
    default:string
}
VAP.decorate(<any>VTrackElement,["kind","src","srclang","label","default"]);