/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "ul", nodeType?: 1): VMDOM.VUlElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({compact:'',type:''})
    export class  VUlElement extends VHtmlElement{
        nodeName="UL";
        compact:string
        type:string
    }
    
}