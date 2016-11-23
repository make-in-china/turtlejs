/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "optgroup", nodeType?: 1): VMElement.VOptgroupElement&IVNodeMethod
}

namespace VMElement{
    export class  VOptgroupElement extends VHtmlElement{
        nodeName="OPTGROUP";
        disabled:string
        label:string
        cloneNode(deep:boolean=false):VOptgroupElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["disabled","label"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VOptgroupElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VOptgroupElement,["disabled","label"]);
}