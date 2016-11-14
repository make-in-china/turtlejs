/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "svg", nodeType?: 1): VMElement.VSvgElement&IVNodeMethod;
}
namespace VMElement{
    export class VSvgElement extends VHtmlElement{
        nodeName="SVG"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    VAP.decorate(<any>VSvgElement,["title","lang","accessKey","webkitdropzone","id"]);
}