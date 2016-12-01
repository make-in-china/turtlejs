/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "frame", nodeType?: 1): VMElement.VFrameElement&IVNodeMethod
}
namespace VMElement{
    export class VFrameElement extends VHtmlElement{
        nodeName="FRAME"
        __closeSelf__=true;
        name:string
        scrolling:string
        frameBorder:string
        marginHeight:string
        marginWidth:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VFrameElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["name","scrolling","frameBorder","marginHeight","marginWidth","title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VFrameElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VFrameElement,["name","scrolling","frameBorder","marginHeight","marginWidth","title","lang","accessKey","webkitdropzone","id"]);
}