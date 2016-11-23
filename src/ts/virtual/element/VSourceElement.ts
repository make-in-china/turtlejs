/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "source", nodeType?: 1): VMElement.VSourceElement&IVNodeMethod
}

namespace VMElement{
    export class  VSourceElement extends VHtmlElement{
        nodeName="SOURCE";
        src:string
        type:string
        srcset:string
        sizes:string
        media:string
        cloneNode(deep:boolean=false):VSourceElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["src","type","srcset","sizes","media"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VSourceElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VSourceElement,["src","type","srcset","sizes","media"]);
}