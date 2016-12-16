/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "ol", nodeType?: 1): VMDOM.VOlElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({reversed:'',start:'',type:'',compact:''})
    export class  VOlElement extends VHtmlElement{
        nodeName="OL";
        reversed:string
        start:string
        type:string
        compact:string
        
    }
    
}