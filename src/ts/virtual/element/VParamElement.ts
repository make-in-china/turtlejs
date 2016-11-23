/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "param", nodeType?: 1): VMElement.VParamElement&IVNodeMethod
}

namespace VMElement{
    export class  VParamElement extends VHtmlElement{
        nodeName="PARAM";
        __closeSelf__=true;
        name:string
        value:string
        type:string
        valueType:string
        cloneNode(deep:boolean=false):VParamElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["name","value","type","valueType"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VParamElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VParamElement,["name","value","type","valueType"]);
}