/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "menu", nodeType?: 1): VMElement.VMenuElement&IVNodeMethod
}

namespace VMElement{
    export class  VMenuElement extends VHtmlElement{
        nodeName="MENU";
        compact:string
        cloneNode(deep:boolean=false):VMenuElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["compact"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VMenuElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VMenuElement,["compact"]);
}