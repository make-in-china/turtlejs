/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "track", nodeType?: 1): VMElement.VTrackElement&IVNodeMethod
}

namespace VMElement{
    export class  VTrackElement extends VHtmlElement{
        nodeName="TRACK";
        kind:string
        src:string
        srclang:string
        label:string
        default:string
        cloneNode(deep:boolean=false):VTrackElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["kind","src","srclang","label","default"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VTrackElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VTrackElement,["kind","src","srclang","label","default"]);
}