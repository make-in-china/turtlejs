/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "table", nodeType?: 1): VMElement.VTableElement&IVNodeMethod
}

namespace VMElement{
    export class  VTableElement extends VHtmlElement{
        nodeName="TABLE";
        align:string
        border:string
        frame:string
        rules:string
        summary:string
        width:string
        bgColor:string
        cellPadding:string
        cellSpacing:string
        cloneNode(deep:boolean=false):VTableElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align","border","frame","rules","summary","width","bgColor","cellPadding","cellSpacing"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VTableElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VTableElement,["align","border","frame","rules","summary","width","bgColor","cellPadding","cellSpacing"]);
}