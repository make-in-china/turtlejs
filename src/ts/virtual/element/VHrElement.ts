/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "hr", nodeType?: 1): VMElement.VHrElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({align:'',color:'',noShade:'',size:'',width:''})
    export class VHrElement extends VHtmlElement{
        nodeName="HR";
        __closeSelf__=true;
        align:string
        color:string
        noShade:string
        size:string
        width:string
        
    }
    
}