/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "label", nodeType?: 1): VMElement.VLabelElement&IVNodeMethod
}
namespace VMElement{
    export class VLabelElement extends VHtmlElement{
        nodeName="LABEL"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VLabelElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VLabelElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VLabelElement,["title","lang","accessKey","webkitdropzone","id"]);
}