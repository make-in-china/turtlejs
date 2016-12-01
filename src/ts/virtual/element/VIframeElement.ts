/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "iframe", nodeType?: 1): VMElement.VIframeElement&IVNodeMethod
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
        cloneNode(deep:boolean=false):VIframeElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["src","srcdoc","name","sandbox","allowFullscreen","width","height","align","scrolling","frameBorder","longDesc","marginHeight","marginWidth"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VIframeElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VIframeElement,["src","srcdoc","name","sandbox","allowFullscreen","width","height","align","scrolling","frameBorder","longDesc","marginHeight","marginWidth"]);
}