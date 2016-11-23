/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "video", nodeType?: 1): VMElement.VVideoElement&IVNodeMethod
}

namespace VMElement{
    export class  VVideoElement extends VHtmlElement{
        nodeName="VIDEO";
        width:string
        height:string
        poster:string
        cloneNode(deep:boolean=false):VVideoElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["width","height","poster"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VVideoElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VVideoElement,["width","height","poster"]);
}