/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "head", nodeType?: 1): VMElement.VHeadElement&IVNodeMethod
}
namespace VMElement{
    export class  VHeadElement extends VHtmlElement{
        nodeName="HEAD";
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VHeadElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title", "lang", "accessKey", "webkitdropzone", "id"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VHeadElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VHeadElement,["title", "lang", "accessKey", "webkitdropzone", "id"]);
}