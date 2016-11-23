/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "ul", nodeType?: 1): VMElement.VUlElement&IVNodeMethod
}

namespace VMElement{
    export class  VUlElement extends VHtmlElement{
        nodeName="UL";
        compact:string
        type:string
        cloneNode(deep:boolean=false):VUlElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["compact","type"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VUlElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VUlElement,["compact","type"]);
}