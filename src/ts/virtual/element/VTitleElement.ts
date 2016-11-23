/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "title", nodeType?: 1): VMElement.VTitleElement&IVNodeMethod
}
namespace VMElement{
    export class VTitleElement extends VHtmlElement{
        nodeName="TITLE"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VTitleElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VTitleElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VTitleElement,["title","lang","accessKey","webkitdropzone","id"]);
}