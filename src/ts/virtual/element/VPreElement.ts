/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "pre", nodeType?: 1): VMElement.VPreElement&IVNodeMethod;
}

namespace VMElement{
    @mergeClass({width:''})
    export class  VPreElement extends VHtmlElement{
        nodeName="PRE";
        width:string
        
    }
    
}