
interface VNodeNames{
    "menu":VMDOM.VMenuElement
}

namespace VMDOM{
    @mergeClass({compact:''})
    export class  VMenuElement extends VHtmlElement{
        nodeName:"MENU"="MENU";
        compact:string
        
    }
    
}