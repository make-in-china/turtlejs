/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dt", nodeType?: 1): VMElement.VDtElement&IVNodeMethod
}
namespace VMElement{
    export class VDtElement extends VHtmlElement{
        nodeName="DT"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VDtElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VDtElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VDtElement,["title","lang","accessKey","webkitdropzone","id"]);
}