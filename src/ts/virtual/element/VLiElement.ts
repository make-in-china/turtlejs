/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "li", nodeType?: 1): VMElement.VLiElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({value:'',type:''})
    export class  VLiElement extends VHtmlElement{
        nodeName="LI";
        value:string
        type:string
        
    }
    
}