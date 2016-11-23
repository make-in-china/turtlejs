/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "option", nodeType?: 1): VMElement.VOptionElement&IVNodeMethod
}

namespace VMElement{
    export class  VOptionElement extends VHtmlElement{
        nodeName="OPTION";
        disabled:string
        label:string
        selected:string
        value:string
        cloneNode(deep:boolean=false):VOptionElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["disabled","label","selected","value"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VOptionElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VOptionElement,["disabled","label","selected","value"]);
}