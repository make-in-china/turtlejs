/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "menu", nodeType?: 1): VMElement.VMenuElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["compact"])
    export class  VMenuElement extends VHtmlElement{
        nodeName="MENU";
        compact:string
        
    }
    
}