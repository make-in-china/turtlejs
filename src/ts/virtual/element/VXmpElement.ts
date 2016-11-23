/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "xmp", nodeType?: 1): VMElement.VXmpElement&IVNodeMethod
}

namespace VMElement{
    export class  VXmpElement extends VHtmlElement{
        nodeName="XMP";
        width:string
        cloneNode(deep:boolean=false):VXmpElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["width"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VXmpElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VXmpElement,["width"]);
}