/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "ol", nodeType?: 1): VMElement.VOlElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({reversed:'',start:'',type:'',compact:''})
    export class  VOlElement extends VHtmlElement{
        nodeName="OL";
        reversed:string
        start:string
        type:string
        compact:string
        
    }
    
}