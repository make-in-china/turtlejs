/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "q", nodeType?: 1): VMElement.VQElement&IVNodeMethod
}

namespace VMElement{
    export class  VQElement extends VHtmlElement{
        nodeName="Q";
        cite:string
        cloneNode(deep:boolean=false):VQElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["cite"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VQElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VQElement,["cite"]);
}