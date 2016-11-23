/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "col", nodeType?: 1): VMElement.VColElement&IVNodeMethod
}
namespace VMElement{
    export class  VColElement extends VHtmlElement{
        nodeName="COL";
        __closeSelf__=true;
        span:string
        align:string
        vAlign:string
        width:string
        cloneNode(deep:boolean=false):VColElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["span","align","vAlign","width"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VColElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VColElement,["span","align","vAlign","width"]);
}