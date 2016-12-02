/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "span", nodeType?: 1): VMElement.VSpanElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VSpanElement extends VHtmlElement{
        nodeName="SPAN"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}