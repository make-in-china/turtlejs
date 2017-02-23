
interface VNodeNames{
    "td":VMDOM.VTdElement
}

namespace VMDOM{
    @mergeClass({colSpan:'',rowSpan:'',headers:'',align:'',axis:'',height:'',width:'',noWrap:'',vAlign:'',bgColor:'',abbr:'',scope:''})
    export class  VTdElement extends VHTMLElement{
        nodeName:"TD"="TD";
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