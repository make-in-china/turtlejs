/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "title", nodeType?: 1): VMElement.VTitleElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VTitleElement extends VHtmlElement{
        nodeName="TITLE"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    
}