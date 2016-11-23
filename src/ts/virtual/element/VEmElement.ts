/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "em", nodeType?: 1): VMElement.VEmElement&IVNodeMethod
}
namespace VMElement{
    export class VEmElement extends VHtmlElement{
        nodeName="EM"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VEmElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VEmElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VEmElement,["title","lang","accessKey","webkitdropzone","id"]);
}