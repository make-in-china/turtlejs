/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "meter", nodeType?: 1): VMElement.VMeterElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["value","min","max","low","high","optimum"])
    export class  VMeterElement extends VHtmlElement{
        nodeName="METER";
        value:string
        min:string
        max:string
        low:string
        high:string
        optimum:string
        
    }
    
}