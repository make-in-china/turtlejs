/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "ul", nodeType?: 1): VMElement.VUlElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({compact:'',type:''})
    export class  VUlElement extends VHtmlElement{
        nodeName="UL";
        compact:string
        type:string
    }
    
}