/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "object", nodeType?: 1): VMDOM.VObjectElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({type:'',name:'',useMap:'',width:'',height:'',align:'',archive:'',code:'',standby:'',codeType:'',border:'',title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VObjectElement extends VHtmlElement{
        nodeName="OBJECT"
        type:string
        name:string
        useMap:string
        width:string
        height:string
        align:string
        archive:string
        code:string
        standby:string
        codeType:string
        border:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        
    }
    
}