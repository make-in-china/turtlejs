/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "legend", nodeType?: 1): VMElement.VLegendElement&IVNodeMethod
}

namespace VMElement{
    export class  VLegendElement extends VHtmlElement{
        nodeName="LEGEND";
        align:string
        cloneNode(deep:boolean=false):VLegendElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VLegendElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VLegendElement,["align"]);
}