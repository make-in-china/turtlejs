/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "pre", nodeType?: 1): VMElement.VPreElement&IVNodeMethod;
}

namespace VMElement{
    export class  VPreElement extends VHtmlElement{
        nodeName="PRE";
        width:string
        cloneNode(deep:boolean=false):VPreElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["width"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
            return <VPreElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VPreElement,["width"]);
}