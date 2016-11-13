/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "meter", nodeType?: 1): VMElement.VMeterElement&IVNodeMethod;
}

namespace VMElement{
    export class  VMeterElement extends VHtmlElement{
        nodeName="METER";
        value:string
        min:string
        max:string
        low:string
        high:string
        optimum:string
    }
    VAP.decorate(<any>VMeterElement,["value","min","max","low","high","optimum"]);
}