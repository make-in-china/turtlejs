/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "th", nodeType?: 1): VMElement.VThElement&IVNodeMethod
}

namespace VMElement{
    export class  VThElement extends VHtmlElement{
        nodeName="TH";
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
        cloneNode(deep:boolean=false):VThElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["colSpan","rowSpan","headers","align","axis","height","width","noWrap","vAlign","bgColor","abbr","scope"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VThElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VThElement,["colSpan","rowSpan","headers","align","axis","height","width","noWrap","vAlign","bgColor","abbr","scope"]);
}