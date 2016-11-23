/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "area", nodeType?: 1): VMElement.VAreaElement&IVNodeMethod
}
namespace VMElement{
    export class  VAreaElement extends VHtmlElement{
        nodeName="AREA";
        __closeSelf__=true;
        alt:string
        coords:string
        shape:string
        target:string
        ping:string
        noHref:string
        href:string
        cloneNode(deep:boolean=false):VAreaElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["alt","coords","shape","target","ping","noHref","href"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VAreaElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VAreaElement,["alt","coords","shape","target","ping","noHref","href"]);
}