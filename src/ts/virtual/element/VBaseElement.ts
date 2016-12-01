/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "base", nodeType?: 1): VMElement.VBaseElement&IVNodeMethod
}
namespace VMElement{
    export class  VBaseElement extends VHtmlElement{
        nodeName="BASE";
        __closeSelf__=true;
        href:string
        target:string
        cloneNode(deep:boolean=false):VBaseElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["href","target"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VBaseElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VBaseElement,["href","target"]);
}