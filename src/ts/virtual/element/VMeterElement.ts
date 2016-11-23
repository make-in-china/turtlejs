/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "meter", nodeType?: 1): VMElement.VMeterElement&IVNodeMethod
}

namespace VMElement{
    export class  VMeterElement extends VHtmlElement{
        nodeName="METER";
        value:string
        min:string
        max:string
        low:string
        high:string
        optimum:string
        cloneNode(deep:boolean=false):VMeterElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["value","min","max","low","high","optimum"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VMeterElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VMeterElement,["value","min","max","low","high","optimum"]);
}