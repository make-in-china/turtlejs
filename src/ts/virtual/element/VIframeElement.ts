/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "iframe", nodeType: 1): VIrameElement&IVNodeMethod;
}
class  VIrameElement extends VHTMLElement{
    src:string
    srcdoc:string
    name:string
    sandbox:string
    allowFullscreen:string
    width:string
    height:string
    align:string
    scrolling:string
    frameBorder:string
    longDesc:string
    marginHeight:string
    marginWidth:string
}
VAP.decorate(<any>VIrameElement,["src","srcdoc","name","sandbox","allowFullscreen","width","height","align","scrolling","frameBorder","longDesc","marginHeight","marginWidth"]);