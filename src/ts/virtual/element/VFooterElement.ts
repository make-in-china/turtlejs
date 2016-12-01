/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "footer", nodeType?: 1): VMElement.VFooterElement&IVNodeMethod
}
namespace VMElement{
    export class VFooterElement extends VHtmlElement{
        nodeName="FOOTER"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VFooterElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VFooterElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VFooterElement,["title","lang","accessKey","webkitdropzone","id"]);
}