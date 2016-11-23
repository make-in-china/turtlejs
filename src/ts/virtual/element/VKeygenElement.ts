/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "keygen", nodeType?: 1): VMElement.VKeygenElement&IVNodeMethod
}

namespace VMElement{
    export class  VKeygenElement extends VHtmlElement{
        nodeName="KEYGEN";
        autofocus:string
        challenge:string
        disabled:string
        keytype:string
        name:string
        cloneNode(deep:boolean=false):VKeygenElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["autofocus","challenge","disabled","keytype","name"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VKeygenElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VKeygenElement,["autofocus","challenge","disabled","keytype","name"]);
}