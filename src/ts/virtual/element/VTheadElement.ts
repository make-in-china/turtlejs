/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "thead", nodeType?: 1): VMElement.VTheadElement&IVNodeMethod
}

namespace VMElement{
    export class  VTheadElement extends VHtmlElement{
        nodeName="THREAD"
        align:string
        vAlign:string
        cloneNode(deep:boolean=false):VTheadElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align","vAlign"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VTheadElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VTheadElement,["align","vAlign"]);
}