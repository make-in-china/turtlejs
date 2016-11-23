/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "ol", nodeType?: 1): VMElement.VOlElement&IVNodeMethod
}

namespace VMElement{
    export class  VOlElement extends VHtmlElement{
        nodeName="OL";
        reversed:string
        start:string
        type:string
        compact:string
        cloneNode(deep:boolean=false):VOlElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["reversed","start","type","compact"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VOlElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VOlElement,["reversed","start","type","compact"]);
}