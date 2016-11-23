/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "form", nodeType?: 1): VMElement.VFormElement&IVNodeMethod
}
namespace VMElement{
    export class VFormElement extends VHtmlElement{
        nodeName="FORM"
        name:string
        target:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VFormElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["name","target","title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VFormElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VFormElement,["name","target","title","lang","accessKey","webkitdropzone","id"]);
}