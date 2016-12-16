/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "head", nodeType?: 1): VMDOM.VHeadElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'', lang:'', accessKey:'', webkitdropzone:'', id:''})
    export class  VHeadElement extends VHtmlElement{
        nodeName="HEAD";
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}