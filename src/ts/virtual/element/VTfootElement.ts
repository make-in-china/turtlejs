/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "tfoot", nodeType?: 1): VMElement.VTfootElement&IVNodeMethod
}

namespace VMElement{
    export class  VTfootElement extends VHtmlElement{
        nodeName="TFOOT";
        align:string
        vAlign:string
        cloneNode(deep:boolean=false):VTfootElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align","vAlign"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VTfootElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VTfootElement,["align","vAlign"]);
}