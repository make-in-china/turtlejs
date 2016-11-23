/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "span", nodeType?: 1): VMElement.VSpanElement&IVNodeMethod
}
namespace VMElement{
    export class VSpanElement extends VHtmlElement{
        nodeName="SPAN"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VSpanElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VSpanElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VSpanElement,["title","lang","accessKey","webkitdropzone","id"]);
}