/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "menu", nodeType?: 1): VMElement.VMenuElement&IVNodeMethod;
}

namespace VMElement{
    export class  VMenuElement extends VHTMLElement{
        nodeName="MENU";
        compact:string
    }
    VAP.decorate(<any>VMenuElement,["compact"]);
}