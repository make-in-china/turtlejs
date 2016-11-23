/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "style", nodeType?: 1): VMElement.VStyleElement&IVNodeMethod
}

namespace VMElement{
    export class  VStyleElement extends VHtmlElement{
        nodeName="STYLE";
        media:string
        type:string
        cloneNode(deep:boolean=false):VStyleElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["media","type"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VStyleElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VStyleElement,["media","type"]);
}