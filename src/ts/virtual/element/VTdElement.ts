/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "td", nodeType?: 1): VMElement.VTdElement&IVNodeMethod
}

namespace VMElement{
    export class  VTdElement extends VHtmlElement{
        nodeName="TD";
        colSpan:string
        rowSpan:string
        headers:string
        align:string
        axis:string
        height:string
        width:string
        noWrap:string
        vAlign:string
        bgColor:string
        abbr:string
        scope:string
        cloneNode(deep:boolean=false):VTdElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["colSpan","rowSpan","headers","align","axis","height","width","noWrap","vAlign","bgColor","abbr","scope"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VTdElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VTdElement,["colSpan","rowSpan","headers","align","axis","height","width","noWrap","vAlign","bgColor","abbr","scope"]);
}