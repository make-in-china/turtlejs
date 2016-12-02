/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "body", nodeType?: 1): VMElement.VBodyElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({text:'',link:'',vLink:'',aLink:'',bgColor:'',background:''})
    export class  VBodyElement extends VHtmlElement{
        nodeName="BODY";
        text:string
        link:string
        vLink:string
        aLink:string
        bgColor:string
        background:string
        
    }
    
}