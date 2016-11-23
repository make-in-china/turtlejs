/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "colgroup", nodeType?: 1): VMElement.VColgroupElement&IVNodeMethod
}
namespace VMElement{
    export class  VColgroupElement extends VHtmlElement{
        nodeName="COLGROUP";
        span:string
        align:string
        vAlign:string
        width:string
        cloneNode(deep:boolean=false):VColgroupElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["span","align","vAlign","width"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VColgroupElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VColgroupElement,["span","align","vAlign","width"]);
}