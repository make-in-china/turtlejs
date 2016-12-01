/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "p", nodeType?: 1): VMElement.VPElement&IVNodeMethod
}

namespace VMElement{
    export class  VPElement extends VHtmlElement{
        nodeName="P";
        align:string
        cloneNode(deep:boolean=false):VPElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VPElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VPElement,["align"]);
}