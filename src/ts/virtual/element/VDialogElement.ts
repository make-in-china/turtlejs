/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dialog", nodeType?: 1): VMElement.VDialogElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({open:''})
    export class  VDialogElement extends VHtmlElement{
        nodeName="DIALOG";
        open:string
        
    }
    
}