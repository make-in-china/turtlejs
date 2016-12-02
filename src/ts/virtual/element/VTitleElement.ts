/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "title", nodeType?: 1): VMElement.VTitleElement&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["title","lang","accessKey","webkitdropzone","id"])
    export class VTitleElement extends VHtmlElement{
        nodeName="TITLE"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        loneNode(deep:boolean=false):VTitleElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VTitleElement&IVNodeMethod>newNode;
        }
    }
    
}