
interface VNodeNames{
    "ol":VMDOM.VOlElement
}

namespace VMDOM{
    @mergeClass({reversed:'',start:'',type:'',compact:''})
    export class  VOlElement extends VHTMLElement{
        nodeName:"OL"="OL";
        reversed:string
        start:string
        type:string
        compact:string
        
    }
    
}