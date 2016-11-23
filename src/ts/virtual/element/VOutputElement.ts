/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "output", nodeType?: 1): VMElement.VOutputElement&IVNodeMethod
}

namespace VMElement{
    export class  VOutputElement extends VHtmlElement{
        nodeName="OUTPUT";
        name:string
        cloneNode(deep:boolean=false):VOutputElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["name"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VOutputElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VOutputElement,["name"]);
}