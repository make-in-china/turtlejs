/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "svg", nodeType?: 1): VMElement.VSvgElement&IVNodeMethod
}
namespace VMElement{
    export class VSvgElement extends VHtmlElement{
        nodeName="SVG"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VSvgElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VSvgElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VSvgElement,["title","lang","accessKey","webkitdropzone","id"]);
}