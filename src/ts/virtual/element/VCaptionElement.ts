/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "caption", nodeType?: 1): VMElement.VCaptionElement&IVNodeMethod
}
namespace VMElement{
    export class  VCaptionElement extends VHtmlElement{
        nodeName="CAPTION";
        align:string
        cloneNode(deep:boolean=false):VCaptionElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VCaptionElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VCaptionElement,["align"]);
}