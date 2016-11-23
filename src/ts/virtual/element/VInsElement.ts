/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "ins", nodeType?: 1): VMElement.VInsElement&IVNodeMethod
}

namespace VMElement{
    export class  VInsElement extends VHtmlElement{
        nodeName="INS";
        cite:string
        dateTime:string
        cloneNode(deep:boolean=false):VInsElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["cite","dateTime"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VInsElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VInsElement,["cite","dateTime"]);
}