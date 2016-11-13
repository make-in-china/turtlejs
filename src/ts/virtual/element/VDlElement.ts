/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dl", nodeType?: 1): VMElement.VDlElement&IVNodeMethod;
}
namespace VMElement{
    export class  VDlElement extends VHTMLElement{
        nodeName="DL"
        compact:string
    }
    VAP.decorate(<any>VDlElement,["compact"]);
}