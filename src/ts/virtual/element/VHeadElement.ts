/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "head", nodeType?: 1): VMElement.VHeadElement&IVNodeMethod
}
namespace VMElement{
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