/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "body", nodeType?: 1): VMElement.VBodyElement&IVNodeMethod
}
namespace VMElement{
    export class  VBodyElement extends VHtmlElement{
        nodeName="BODY";
        text:string
        link:string
        vLink:string
        aLink:string
        bgColor:string
        background:string
        cloneNode(deep:boolean=false):VBodyElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["text","link","vLink","aLink","bgColor","background"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VBodyElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VBodyElement,["text","link","vLink","aLink","bgColor","background"]);
}