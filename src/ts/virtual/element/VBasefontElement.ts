/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "basefont", nodeType?: 1): VMElement.VBasefontElement&IVNodeMethod
}
namespace VMElement{
    export class VBasefontElement extends VHtmlElement{
        nodeName="BASEFONT"
        __closeSelf__=true;
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VBasefontElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VBasefontElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VBasefontElement,["title","lang","accessKey","webkitdropzone","id"]);
}