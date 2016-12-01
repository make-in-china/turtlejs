/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h2", nodeType?: 1): VMElement.VH2Element&IVNodeMethod
}
namespace VMElement{
    export class  VH2Element extends VHtmlElement{
        nodeName="H2";
        align:string
        cloneNode(deep:boolean=false):VH2Element&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VH2Element&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VH2Element,["align"]);
}