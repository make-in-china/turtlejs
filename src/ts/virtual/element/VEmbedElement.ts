/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "embed", nodeType?: 1): VMElement.VEmbedElement&IVNodeMethod
}
namespace VMElement{
    export class VEmbedElement extends VHtmlElement{
        nodeName="EMBED"
        type:string
        width:string
        height:string
        align:string
        name:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VEmbedElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["type","width","height","align","name","title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VEmbedElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VEmbedElement,["type","width","height","align","name","title","lang","accessKey","webkitdropzone","id"]);
}