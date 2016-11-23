/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "circle", nodeType?: 1): VMElement.VCircleElement&IVNodeMethod
}
namespace VMElement{
    export class VCircleElement extends VHtmlElement{
        nodeName="CIRCLE"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VCircleElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VCircleElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VCircleElement,["title","lang","accessKey","webkitdropzone","id"]);
}