/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "header", nodeType?: 1): VMElement.VHeaderElement&IVNodeMethod
}
namespace VMElement{
    export class VHeaderElement extends VHtmlElement{
        nodeName="HEADER"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VHeaderElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VHeaderElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VHeaderElement,["title","lang","accessKey","webkitdropzone","id"]);
}