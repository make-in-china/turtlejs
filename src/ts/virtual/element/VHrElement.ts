/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "hr", nodeType?: 1): VMElement.VHrElement&IVNodeMethod
}
namespace VMElement{
    export class VHrElement extends VHtmlElement{
        nodeName="HR";
        __closeSelf__=true;
        align:string
        color:string
        noShade:string
        size:string
        width:string
        cloneNode(deep:boolean=false):VHrElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align","color","noShade","size","width"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VHrElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VHrElement,["align","color","noShade","size","width"]);
}