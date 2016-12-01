/// <reference path="../node/Attribute_Property.ts"/>

interface IVNodeMethod{
    (nodeName: "a", nodeType?: 1): VMElement.VAElement&IVNodeMethod;
}
namespace VMElement{
    export class VAElement extends VHtmlElement{
        nodeName="A"
        target:string
        download:string
        ping:string
        rel:string
        hreflang:string
        type:string
        coords:string
        charset:string
        name:string
        rev:string
        shape:string
        href:string
        cloneNode(deep:boolean=false):VAElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["target", "download", "ping", "rel", "hreflang", "type", "coords", "charset", "name", "rev", "shape", "href"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
            return <VAElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VAElement,["target", "download", "ping", "rel", "hreflang", "type", "coords", "charset", "name", "rev", "shape", "href"]);
}