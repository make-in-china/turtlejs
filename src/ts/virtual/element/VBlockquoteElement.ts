/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "blockquote", nodeType?: 1): VMElement.VBlockquoteElement&IVNodeMethod
}
namespace VMElement{
    export class  VBlockquoteElement extends VHtmlElement{
        nodeName="BLOCKQUOTE";
        cite:string
        cloneNode(deep:boolean=false):VBlockquoteElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["cite"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VBlockquoteElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VBlockquoteElement,["cite"]);
}