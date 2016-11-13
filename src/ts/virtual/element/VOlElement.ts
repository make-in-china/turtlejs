/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "ol", nodeType?: 1): VMElement.VOlElement&IVNodeMethod;
}

namespace VMElement{
    export class  VOlElement extends VHTMLElement{
        nodeName="OL";
        reversed:string
        start:string
        type:string
        compact:string
    }
    VAP.decorate(<any>VOlElement,["reversed","start","type","compact"]);
}