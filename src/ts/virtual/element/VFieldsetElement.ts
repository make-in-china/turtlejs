
interface IVNodeMethod{
    (nodeName: "fieldset", nodeType?: 1): VMDOM.VFieldsetElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({disabled:'',name:''})
    export class  VFieldsetElement extends VHtmlElement{
        nodeName:"FIELDSET"="FIELDSET"
        disabled:string
        name:string
        
    }
    
}