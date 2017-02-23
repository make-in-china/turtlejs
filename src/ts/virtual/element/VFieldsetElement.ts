
interface VNodeNames{
    "fieldset":VMDOM.VFieldsetElement
}
namespace VMDOM{
    @mergeClass({disabled:'',name:''})
    export class  VFieldsetElement extends VHTMLElement{
        nodeName:"FIELDSET"="FIELDSET"
        disabled:string
        name:string
        
    }
    
}