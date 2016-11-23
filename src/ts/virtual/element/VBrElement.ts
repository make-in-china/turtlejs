/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "br", nodeType?: 1): VMElement.VBrElement&IVNodeMethod
}
namespace VMElement{
    export class  VBrElement extends VHtmlElement{
        nodeName="BR";
        __closeSelf__=true;
        clear:string;
        cloneNode(deep:boolean=false):VBrElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["clear"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VBrElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VBrElement,["clear"]);
}