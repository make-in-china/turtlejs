/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "track", nodeType?: 1): VMElement.VTrackElement&IVNodeMethod
}

namespace VMElement{
    @mergeClass({kind:'',src:'',srclang:'',label:'',default:''})
    export class  VTrackElement extends VHtmlElement{
        nodeName="TRACK";
        kind:string
        src:string
        srclang:string
        label:string
        default:string
    }
    
}