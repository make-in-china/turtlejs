/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h1", nodeType?: 1): VMElement.VH1Element&IVNodeMethod
}
namespace VMElement{
    export class  VH1Element extends VHtmlElement{
        nodeName="H1";
        align:string
        cloneNode(deep:boolean=false):VH1Element&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VH1Element&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VH1Element,["align"]);
}