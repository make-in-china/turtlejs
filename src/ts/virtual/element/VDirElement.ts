/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dir", nodeType?: 1): VMElement.VDirElement&IVNodeMethod;
}
namespace VMElement{
    export class  VDirElement extends VHtmlElement{
        nodeName="DIR"
        compact:string
    }
    VAP.decorate(<any>VDirElement,["compact"]);
}