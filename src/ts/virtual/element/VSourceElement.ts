/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "source", nodeType?: 1): VMDOM.VSourceElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({src:'',type:'',srcset:'',sizes:'',media:''})
    export class  VSourceElement extends VHtmlElement{
        nodeName="SOURCE";
        src:string
        type:string
        srcset:string
        sizes:string
        media:string
        
    }
    
}