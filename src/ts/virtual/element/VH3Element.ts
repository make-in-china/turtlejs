/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h3", nodeType?: 1): VMElement.VH3Element&IVNodeMethod
}
namespace VMElement{
    export class  VH3Element extends VHtmlElement{
        nodeName="H3";
        align:string
        cloneNode(deep:boolean=false):VH3Element&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VH3Element&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VH3Element,["align"]);
}