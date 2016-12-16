/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "i", nodeType?: 1): VMDOM.VIElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VIElement extends VHtmlElement{
        nodeName="I"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}