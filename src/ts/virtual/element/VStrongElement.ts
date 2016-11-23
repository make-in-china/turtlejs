/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "strong", nodeType?: 1): VMElement.VStrongElement&IVNodeMethod
}
namespace VMElement{
    export class VStrongElement extends VHtmlElement{
        nodeName="STRONG"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VStrongElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VStrongElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VStrongElement,["title","lang","accessKey","webkitdropzone","id"]);
}