/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h4", nodeType?: 1): VMElement.VH4Element&IVNodeMethod
}
namespace VMElement{
    export class  VH4Element extends VHtmlElement{
        nodeName="H4";
        align:string
        cloneNode(deep:boolean=false):VH4Element&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VH4Element&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VH4Element,["align"]);
}