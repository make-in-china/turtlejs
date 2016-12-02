/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dialog", nodeType?: 1): VMElement.VDialogElement&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["open"])
    export class  VDialogElement extends VHtmlElement{
        nodeName="DIALOG";
        open:string
        
    }
    
}