/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "progress", nodeType?: 1): VMElement.VProgressElement&IVNodeMethod
}

namespace VMElement{
    export class  VProgressElement extends VHtmlElement{
        nodeName="PROGRESS";
        value:string
        max:string
        cloneNode(deep:boolean=false):VProgressElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["value","max"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VProgressElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VProgressElement,["value","max"]);
}