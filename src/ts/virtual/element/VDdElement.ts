/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dd", nodeType?: 1): VMElement.VDdElement&IVNodeMethod
}
namespace VMElement{
    export class VDdElement extends VHtmlElement{
        nodeName="DD"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VDdElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VDdElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VDdElement,["title","lang","accessKey","webkitdropzone","id"]);
}