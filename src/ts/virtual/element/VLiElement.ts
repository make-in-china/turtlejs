
interface IVNodeMethod{
    (nodeName: "li", nodeType?: 1): VMDOM.VLiElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({value:'',type:''})
    export class  VLiElement extends VHtmlElement{
        nodeName:"LI"="LI";
        value:string
        type:string
        
    }
    
}