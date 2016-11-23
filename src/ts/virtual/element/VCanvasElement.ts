/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "canvas", nodeType?: 1): VMElement.VCanvasElement&IVNodeMethod
}
namespace VMElement{
    export class  VCanvasElement extends VHtmlElement{
        nodeName="CANVAS";
        width:string
        height:string
        cloneNode(deep:boolean=false):VCanvasElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["width","height"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VCanvasElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VCanvasElement,["width","height"]);
}