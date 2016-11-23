/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "i", nodeType?: 1): VMElement.VIElement&IVNodeMethod
}
namespace VMElement{
    export class VIElement extends VHtmlElement{
        nodeName="I"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VIElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VIElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VIElement,["title","lang","accessKey","webkitdropzone","id"]);
}