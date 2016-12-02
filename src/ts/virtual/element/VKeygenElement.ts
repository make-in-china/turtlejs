/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "keygen", nodeType?: 1): VMElement.VKeygenElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["autofocus","challenge","disabled","keytype","name"])
    export class  VKeygenElement extends VHtmlElement{
        nodeName="KEYGEN";
        autofocus:string
        challenge:string
        disabled:string
        keytype:string
        name:string
        
    }
    
}