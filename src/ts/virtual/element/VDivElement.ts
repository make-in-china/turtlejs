/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "div", nodeType?: 1): VMElement.VDivElement&IVNodeMethod
}
namespace VMElement{
    export class  VDivElement extends VHtmlElement{
        nodeName="DIV"
        align:string
        cloneNode(deep:boolean=false):VDivElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VDivElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VDivElement,["align"]);
}