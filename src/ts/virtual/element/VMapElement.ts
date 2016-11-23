/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "map", nodeType?: 1): VMElement.VMapElement&IVNodeMethod
}

namespace VMElement{
    export class  VMapElement extends VHtmlElement{
        nodeName="MAP";
        __closeSelf__=true;
        name:string
        cloneNode(deep:boolean=false):VMapElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["name"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VMapElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VMapElement,["name"]);
}