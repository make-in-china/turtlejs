/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "blockquote", nodeType?: 1): VMElement.VBlockquoteElement&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["cite"])
    export class  VBlockquoteElement extends VHtmlElement{
        nodeName="BLOCKQUOTE";
        cite:string
        
    }
    
}