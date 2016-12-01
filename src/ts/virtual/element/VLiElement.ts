/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "li", nodeType?: 1): VMElement.VLiElement&IVNodeMethod
}

namespace VMElement{
    export class  VLiElement extends VHtmlElement{
        nodeName="LI";
        value:string
        type:string
        cloneNode(deep:boolean=false):VLiElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["value","type"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VLiElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VLiElement,["value","type"]);
}