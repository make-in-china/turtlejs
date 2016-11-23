/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "b", nodeType?: 1): VMElement.VBElement&IVNodeMethod
}
namespace VMElement{
    export class VBElement extends VHtmlElement{
        nodeName="B"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VBElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VBElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VBElement,["title","lang","accessKey","webkitdropzone","id"]);
}