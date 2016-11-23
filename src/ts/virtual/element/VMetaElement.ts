/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "meta", nodeType?: 1): VMElement.VMetaElement&IVNodeMethod
}

namespace VMElement{
    export class  VMetaElement extends VHtmlElement{
        nodeName="META";
        __closeSelf__=true;
        name:string
        content:string
        scheme:string
        cloneNode(deep:boolean=false):VMetaElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["name","content","scheme"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VMetaElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VMetaElement,["name","content","scheme"]);
}