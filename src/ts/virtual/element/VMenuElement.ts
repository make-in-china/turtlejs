
interface IVNodeMethod{
    (nodeName: "menu", nodeType?: 1): VMDOM.VMenuElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({compact:''})
    export class  VMenuElement extends VHtmlElement{
        nodeName="MENU";
        compact:string
        
    }
    
}