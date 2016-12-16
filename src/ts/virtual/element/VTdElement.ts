/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "td", nodeType?: 1): VMDOM.VTdElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({colSpan:'',rowSpan:'',headers:'',align:'',axis:'',height:'',width:'',noWrap:'',vAlign:'',bgColor:'',abbr:'',scope:''})
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
        
    }
    
}