/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h6", nodeType?: 1): VMElement.VH6Element&IVNodeMethod
}
namespace VMElement{
    export class  VH6Element extends VHtmlElement{
        nodeName="H6";
        align:string
        cloneNode(deep:boolean=false):VH6Element&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VH6Element&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VH6Element,["align"]);
}