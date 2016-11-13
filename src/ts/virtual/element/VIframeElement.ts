/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "iframe", nodeType?: 1): VMElement.VIframeElement&IVNodeMethod;
}

namespace VMElement{
    export class  VIframeElement extends VHtmlElement{
        nodeName="IFRAME";
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
    VAP.decorate(<any>VIframeElement,["src","srcdoc","name","sandbox","allowFullscreen","width","height","align","scrolling","frameBorder","longDesc","marginHeight","marginWidth"]);
}