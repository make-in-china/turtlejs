/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "map", nodeType?: 1): VMElement.VMapElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({name:''})
    export class  VMapElement extends VHtmlElement{
        nodeName="MAP";
        __closeSelf__=true;
        name:string
        
    }
    
}