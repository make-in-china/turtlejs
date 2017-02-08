
interface IVNodeMethod{
    (nodeName: "ul", nodeType?: 1): VMDOM.VUlElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({compact:'',type:''})
    export class  VUlElement extends VHtmlElement{
        nodeName:"UL"="UL";
        compact:string
        type:string
    }
    
}