/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dt", nodeType?: 1): VMElement.VDtElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VDtElement extends VHtmlElement{
        nodeName="DT"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}