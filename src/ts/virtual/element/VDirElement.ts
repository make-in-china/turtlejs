/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dir", nodeType?: 1): VMElement.VDirElement&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["compact"])
    export class  VDirElement extends VHtmlElement{
        nodeName="DIR"
        compact:string
        
    }
    
}