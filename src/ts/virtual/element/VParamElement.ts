/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "param", nodeType?: 1): VMElement.VParamElement&IVNodeMethod
}

namespace VMElement{
    @VAP.setA_P(["name","value","type","valueType"])
    export class  VParamElement extends VHtmlElement{
        nodeName="PARAM";
        __closeSelf__=true;
        name:string
        value:string
        type:string
        valueType:string
        
    }
    
}