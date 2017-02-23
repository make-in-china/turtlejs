
interface VNodeNames{
    "menu":VMDOM.VMenuElement
}

namespace VMDOM{
    @mergeClass({compact:''})
    export class  VMenuElement extends VHTMLElement{
        nodeName:"MENU"="MENU";
        compact:string
        
    }
    
}