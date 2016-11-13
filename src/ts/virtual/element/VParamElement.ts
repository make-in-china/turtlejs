/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "param", nodeType?: 1): VMElement.VParamElement&IVNodeMethod;
}

namespace VMElement{
    export class  VParamElement extends VHTMLElement{
        nodeName="PARAM";
        __closeSelf__=true;
        name:string
        value:string
        type:string
        valueType:string
    }
    VAP.decorate(<any>VParamElement,["name","value","type","valueType"]);
}