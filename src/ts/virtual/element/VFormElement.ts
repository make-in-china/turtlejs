/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "form", nodeType?: 1): VMElement.VFormElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({name:'',target:'',title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VFormElement extends VHtmlElement{
        nodeName="FORM"
        name:string
        target:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}