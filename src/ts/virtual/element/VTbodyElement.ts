/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "tbody", nodeType?: 1): VMElement.VTbodyElement&IVNodeMethod
}

namespace VMElement{
    export class  VTbodyElement extends VHtmlElement{
        nodeName="TBODY";
        align:string
        vAlign:string
        cloneNode(deep:boolean=false):VTbodyElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align","vAlign"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VTbodyElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VTbodyElement,["align","vAlign"]);
}