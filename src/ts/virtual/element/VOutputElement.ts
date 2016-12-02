/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "output", nodeType?: 1): VMElement.VOutputElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["name"])
    export class  VOutputElement extends VHtmlElement{
        nodeName="OUTPUT";
        name:string
        
    }
    
}