/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h5", nodeType?: 1): VMElement.VH5Element&IVNodeMethod
}
namespace VMElement{
    export class  VH5Element extends VHtmlElement{
        nodeName="H5";
        align:string
        cloneNode(deep:boolean=false):VH5Element&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VH5Element&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VH5Element,["align"]);
}